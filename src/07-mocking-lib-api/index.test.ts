// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockCreate = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });
    axios.create = mockCreate;
    await throttledGetDataFromApi('/todos/1');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    axios.create = jest.fn().mockReturnValue({
      get: mockGet,
    });
    await throttledGetDataFromApi('/todos/1');
    expect(mockGet).toHaveBeenCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    const mockResponse = { data: { id: 1, title: 'Test' } };
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    });
    const result = await throttledGetDataFromApi('/todos/1');
    expect(result).toEqual(mockResponse.data);
  });
});
