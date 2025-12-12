
import { MathQuestion, OperationType } from '../types';

export const generateQuestion = (
  ageRangeKey: string,
  operation: OperationType,
): MathQuestion => {
  let num1: number;
  let num2: number;
  let question: string;
  let answer: number;

  switch (ageRangeKey) {
    case '5-6':
      switch (operation) {
        case OperationType.ADDITION:
          num1 = Math.floor(Math.random() * 10) + 1; // 1-10
          num2 = Math.floor(Math.random() * 10) + 1; // 1-10
          answer = num1 + num2;
          question = `${num1} + ${num2} = ?`;
          break;
        case OperationType.SUBTRACTION_SIMPLE:
          num1 = Math.floor(Math.random() * 10) + 5; // 5-14
          num2 = Math.floor(Math.random() * 4) + 1; // 1-4
          answer = num1 - num2;
          if (answer < 0) { // Ensure positive result, re-roll if needed
             return generateQuestion(ageRangeKey, operation);
          }
          question = `${num1} - ${num2} = ?`;
          break;
        case OperationType.ZERO_ADDITION:
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = 0;
          answer = num1 + num2;
          question = `${num1} + ${num2} = ?`;
          break;
        case OperationType.ZERO_SUBTRACTION:
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = 0;
          answer = num1 - num2;
          question = `${num1} - ${num2} = ?`;
          break;
        default:
          throw new Error(`Unsupported operation for 5-6: ${operation}`);
      }
      break;
    case '7-8':
      switch (operation) {
        case OperationType.ADDITION:
          num1 = Math.floor(Math.random() * 50) + 10; // 10-59
          num2 = Math.floor(Math.random() * 50) + 10; // 10-59
          answer = num1 + num2;
          question = `${num1} + ${num2} = ?`;
          break;
        case OperationType.SUBTRACTION:
          num1 = Math.floor(Math.random() * 50) + 20; // 20-69
          num2 = Math.floor(Math.random() * 15) + 5; // 5-19
          if (num2 > num1) { // Ensure positive result
            const temp = num1;
            num1 = num2;
            num2 = temp;
          }
          answer = num1 - num2;
          question = `${num1} - ${num2} = ?`;
          break;
        case OperationType.MULTIPLICATION_SIMPLE:
          num1 = Math.floor(Math.random() * 6) + 2; // 2-7
          num2 = Math.floor(Math.random() * 6) + 2; // 2-7
          answer = num1 * num2;
          question = `${num1} x ${num2} = ?`;
          break;
        case OperationType.DIVISION_SIMPLE:
          let divisor = Math.floor(Math.random() * 4) + 2; // 2-5
          let multiple = Math.floor(Math.random() * 5) + 1; // 1-5
          num1 = divisor * multiple;
          num2 = divisor;
          answer = num1 / num2;
          question = `${num1} ÷ ${num2} = ?`;
          break;
        default:
          throw new Error(`Unsupported operation for 7-8: ${operation}`);
      }
      break;
    case '9-10':
      switch (operation) {
        case OperationType.ADDITION:
          num1 = Math.floor(Math.random() * 100) + 100; // 100-199
          num2 = Math.floor(Math.random() * 100) + 100; // 100-199
          answer = num1 + num2;
          question = `${num1} + ${num2} = ?`;
          break;
        case OperationType.SUBTRACTION:
          num1 = Math.floor(Math.random() * 100) + 150; // 150-249
          num2 = Math.floor(Math.random() * 100) + 50; // 50-149
          if (num2 > num1) {
            const temp = num1;
            num1 = num2;
            num2 = temp;
          }
          answer = num1 - num2;
          question = `${num1} - ${num2} = ?`;
          break;
        case OperationType.MULTIPLICATION:
          num1 = Math.floor(Math.random() * 10) + 5; // 5-14
          num2 = Math.floor(Math.random() * 10) + 5; // 5-14
          answer = num1 * num2;
          question = `${num1} x ${num2} = ?`;
          break;
        case OperationType.DIVISION:
          let divisor = Math.floor(Math.random() * 10) + 2; // 2-11
          let multiple = Math.floor(Math.random() * 10) + 2; // 2-11
          num1 = divisor * multiple;
          num2 = divisor;
          answer = num1 / num2;
          question = `${num1} ÷ ${num2} = ?`;
          break;
        default:
          throw new Error(`Unsupported operation for 9-10: ${operation}`);
      }
      break;
    default:
      throw new Error(`Unknown age range key: ${ageRangeKey}`);
  }

  return { num1, num2, operation, question, answer };
};
