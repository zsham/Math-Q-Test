
import { AgeRange, OperationType } from './types';

export const AGE_RANGES: AgeRange[] = [
  {
    key: '5-6',
    label: 'Ages 5-6',
    minAge: 5,
    maxAge: 6,
    operations: [
      OperationType.ADDITION,
      OperationType.SUBTRACTION_SIMPLE,
      OperationType.ZERO_ADDITION,
      OperationType.ZERO_SUBTRACTION,
    ],
  },
  {
    key: '7-8',
    label: 'Ages 7-8',
    minAge: 7,
    maxAge: 8,
    operations: [
      OperationType.ADDITION,
      OperationType.SUBTRACTION,
      OperationType.MULTIPLICATION_SIMPLE,
      OperationType.DIVISION_SIMPLE,
    ],
  },
  {
    key: '9-10',
    label: 'Ages 9-10',
    minAge: 9,
    maxAge: 10,
    operations: [
      OperationType.ADDITION,
      OperationType.SUBTRACTION,
      OperationType.MULTIPLICATION,
      OperationType.DIVISION,
    ],
  },
];

export const GEMINI_MODEL = 'gemini-2.5-flash';
