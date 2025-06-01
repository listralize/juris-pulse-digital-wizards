
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import Loading from "./components/Loading";
import { LandingPageRenderer } from "./components/LandingPageRenderer";
import { useLandingPages } from "./hooks/useLandingPages";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Obrigado = lazy(() => import("./pages/Obrigado"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Areas pages
const Familia = lazy(() => import("./pages/areas/Familia"));
const Tributario = lazy(() => import("./pages/areas/Tributario"));
const Empresarial = lazy(() => import("./pages/areas/Empresarial"));
const Trabalho = lazy(() => import("./pages/areas/Trabalho"));
const Constitucional = lazy(() => import("./pages/areas/Constitucional"));
const Administrativo = lazy(() => import("./pages/areas/Administrativo"));
const Previdenciario = lazy(() => import("./pages/areas/Previdenciario"));
const Consumidor = lazy(() => import("./pages/areas/Consumidor"));
const Civil = lazy(() => import("./pages/areas/Civil"));

// Services pages - import all service pages
const servicePages = import.meta.glob('./pages/services/*.tsx');

const queryClient = new QueryClient();

function AppRoutes() {
  const { landingPages, getLandingPageBySlug } = useLandingPages();
  const [serviceComponents, setServiceComponents] = useState<Record<string, React.ComponentType>>({});

  useEffect(() => {
    // Dynamically load all service components
    const loadServiceComponents = async () => {
      const components: Record<string, React.ComponentType> = {};
      
      for (const [path, moduleLoader] of Object.entries(servicePages)) {
        const moduleName = path.replace('./pages/services/', '').replace('.tsx', '');
        try {
          const module = await moduleLoader() as { default: React.ComponentType };
          components[moduleName] = module.default;
        } catch (error) {
          console.error(`Error loading service component ${moduleName}:`, error);
        }
      }
      
      setServiceComponents(components);
    };

    loadServiceComponents();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/obrigado" element={<Obrigado />} />
      
      {/* Areas routes */}
      <Route path="/areas/familia" element={<Familia />} />
      <Route path="/areas/tributario" element={<Tributario />} />
      <Route path="/areas/empresarial" element={<Empresarial />} />
      <Route path="/areas/trabalho" element={<Trabalho />} />
      <Route path="/areas/constitucional" element={<Constitucional />} />
      <Route path="/areas/administrativo" element={<Administrativo />} />
      <Route path="/areas/previdenciario" element={<Previdenciario />} />
      <Route path="/areas/consumidor" element={<Consumidor />} />
      <Route path="/areas/civil" element={<Civil />} />

      {/* Dynamic service routes */}
      {Object.entries(serviceComponents).map(([serviceName, Component]) => (
        <Route 
          key={serviceName} 
          path={`/servicos/${serviceName.toLowerCase()}`} 
          element={<Component />} 
        />
      ))}

      {/* Dynamic landing page routes */}
      {landingPages.map((page) => (
        <Route 
          key={page.id}
          path={`/${page.slug}`}
          element={<LandingPageRenderer page={page} />}
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <AppRoutes />
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
