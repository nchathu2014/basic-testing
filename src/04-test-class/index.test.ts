// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    const withdrawAmount = 200;
    expect(() => account.withdraw(withdrawAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    const transferAmount = 200;
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(transferAmount, toAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const withdrawAmount = 50;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(0);
    account.transfer(transferAmount, toAccount);
    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(toAccount.getBalance()).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const fetchBalanceSpy = jest.spyOn(account, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValue(50);
    const balance = await account.fetchBalance();
    expect(fetchBalanceSpy).toHaveBeenCalled();
    expect(balance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const newBalance = 50;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
