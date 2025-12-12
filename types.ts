
export enum OperationType {
  ADDITION = 'Addition',
  SUBTRACTION = 'Subtraction',
  SUBTRACTION_SIMPLE = 'Simple Subtraction', // For 5-6 year olds, ensuring positive results
  MULTIPLICATION = 'Multiplication',
  MULTIPLICATION_SIMPLE = 'Simple Multiplication', // For 7-8 year olds, smaller numbers
  DIVISION = 'Division',
  DIVISION_SIMPLE = 'Simple Division', // For 7-8 year olds, no remainder
  ZERO_ADDITION = 'Adding Zero', // Specific for 5-6
  ZERO_SUBTRACTION = 'Subtracting Zero', // Specific for 5-6
}

export interface AgeRange {
  key: string;
  label: string;
  minAge: number;
  maxAge: number;
  operations: OperationType[];
}

export interface MathQuestion {
  num1: number;
  num2: number;
  operation: OperationType;
  question: string;
  answer: number;
}
