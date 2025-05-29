
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Calculator, Plus } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface CalculationResult {
  totalContribution: number;
  breakdown: Array<{
    range: string;
    amount: number;
    rate: number;
    contribution: number;
  }>;
}

const InssCalculator = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [salary, setSalary] = useState('');
  const [employees, setEmployees] = useState([{ id: 1, salary: '' }]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [totalResult, setTotalResult] = useState<number>(0);

  // Tabela INSS 2025
  const inssRanges = [
    { min: 0, max: 1412.00, rate: 7.5 },
    { min: 1412.01, max: 2666.68, rate: 9 },
    { min: 2666.69, max: 4000.03, rate: 12 },
    { min: 4000.04, max: 7786.02, rate: 14 }
  ];

  const calculateInss = (grossSalary: number): CalculationResult => {
    let totalContribution = 0;
    const breakdown: CalculationResult['breakdown'] = [];

    for (const range of inssRanges) {
      if (grossSalary > range.min) {
        const maxValue = Math.min(grossSalary, range.max);
        const rangeAmount = maxValue - (range.min === 0 ? 0 : range.min - 0.01);
        const contribution = rangeAmount * (range.rate / 100);
        
        if (rangeAmount > 0) {
          totalContribution += contribution;
          breakdown.push({
            range: range.max === 7786.02 
              ? `R$ ${range.min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} até R$ ${range.max.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              : `R$ ${range.min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} até R$ ${range.max.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            amount: rangeAmount,
            rate: range.rate,
            contribution: contribution
          });
        }
      }
    }

    return { totalContribution, breakdown };
  };

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary.replace(/[^\d,]/g, '').replace(',', '.'));
    if (salaryValue && salaryValue > 0) {
      const calculation = calculateInss(salaryValue);
      setResult(calculation);
    }
  };

  const addEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, salary: '' }]);
  };

  const updateEmployeeSalary = (id: number, value: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, salary: value } : emp
    ));
  };

  const removeEmployee = (id: number) => {
    if (employees.length > 1) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    employees.forEach(employee => {
      const salaryValue = parseFloat(employee.salary.replace(/[^\d,]/g, '').replace(',', '.'));
      if (salaryValue && salaryValue > 0) {
        const calculation = calculateInss(salaryValue);
        total += calculation.totalContribution;
      }
    });
    setTotalResult(total);
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formatted = (parseFloat(numericValue) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatted === 'NaN' ? '' : formatted;
  };

  return (
    <div className="space-y-8">
      {/* Calculadora Individual */}
      <Card className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white border-black/10'} border`}>
        <CardHeader>
          <CardTitle className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <Calculator className="w-6 h-6" />
            Nova calculadora INSS
          </CardTitle>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            As tabelas de desconto mudaram. Entenda quanto de desconto o seu colaborador terá, de acordo com as novas regras da previdência.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              Salário bruto mensal do seu colaborador
            </Label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                R$
              </span>
              <Input
                type="text"
                value={salary}
                onChange={(e) => setSalary(formatCurrency(e.target.value))}
                placeholder="2.000,00"
                className={`pl-8 ${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-gray-50 border-gray-300'}`}
              />
            </div>
          </div>

          <Button 
            onClick={handleCalculate}
            className={`w-full py-3 text-white font-medium rounded-lg ${
              isDark 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            Calcular
          </Button>

          {result && (
            <Card className={`${isDark ? 'bg-teal-600' : 'bg-teal-600'} text-white border-0`}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Resultado</h3>
                <p className="mb-4">A contribuição do seu colaborador ao INSS será de:</p>
                <div className="text-4xl font-bold mb-2">
                  R$ {result.totalContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <span className="text-lg font-normal ml-2">/por mês</span>
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border`}>
              <CardContent className="p-6">
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  Entenda o cálculo:
                </h4>
                <div className="space-y-2">
                  <div className={`flex justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span>Salário bruto informado</span>
                    <span>R$ {parseFloat(salary.replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {result.breakdown.map((item, index) => (
                    <div key={index} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="flex justify-between">
                        <span>{item.range}</span>
                        <span>{item.rate}%</span>
                      </div>
                      <div className="flex justify-between ml-4">
                        <span>R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} × {item.rate}%</span>
                        <span>R$ {item.contribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`text-xs mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  *O desconto do INSS pode ser de 7,5%, 9%, 12% ou 14% sobre o salário bruto, e segue uma tabela progressiva, de acordo com a faixa salarial.
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Calculadora para Múltiplos Colaboradores */}
      <Card className={`${isDark ? 'bg-black/80 border-white/10' : 'bg-white border-black/10'} border`}>
        <CardHeader>
          <CardTitle className={`text-xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            Calcular para múltiplos colaboradores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {employees.map((employee, index) => (
            <div key={employee.id} className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <Label className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                  Colaborador {index + 1}
                </Label>
                <div className="relative">
                  <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    R$
                  </span>
                  <Input
                    type="text"
                    value={employee.salary}
                    onChange={(e) => updateEmployeeSalary(employee.id, formatCurrency(e.target.value))}
                    placeholder="2.000,00"
                    className={`pl-8 ${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-gray-50 border-gray-300'}`}
                  />
                </div>
              </div>
              {employees.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEmployee(employee.id)}
                  className={`mt-6 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
                >
                  Remover
                </Button>
              )}
            </div>
          ))}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={addEmployee}
              className={`flex items-center gap-2 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
            >
              <Plus className="w-4 h-4" />
              Adicionar mais um colaborador
            </Button>
            <Button
              onClick={calculateTotal}
              className={`text-white ${
                isDark 
                  ? 'bg-teal-600 hover:bg-teal-700' 
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              Calcular Total
            </Button>
          </div>

          {totalResult > 0 && (
            <Card className={`${isDark ? 'bg-teal-600' : 'bg-teal-600'} text-white border-0`}>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Total de Contribuições INSS</h4>
                <div className="text-2xl font-bold">
                  R$ {totalResult.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <span className="text-sm font-normal ml-2">/por mês</span>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  Soma de todos os colaboradores informados
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InssCalculator;
