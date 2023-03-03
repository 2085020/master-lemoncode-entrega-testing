import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
describe('common/component/confirmation-dialog.hook', () => {
  it('test create hook', () => {
    // ARRANGE
    // ACT
    const { result } = renderHook(() => useConfirmationDialog());

    // ASSERT
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
  });

  it('test add item to delete', () => {
    // ARRANGE
    const itemToDelete = {
      id: '1',
      name: 'Test',
    };
    // ACT
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    // ASSERT
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(itemToDelete);
  });

  it('test add item to delete, but close', () => {
    // ARRANGE
    const itemToDelete = {
      id: '1',
      name: 'Test',
    };
    // ACT
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    // ASSERT
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(itemToDelete);

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toEqual(false);
  });

  it('test add item to delete, and accept', () => {
    // ARRANGE
    const itemToDelete = {
      id: '1',
      name: 'Test',
    };
    // ACT
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    // ASSERT
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(itemToDelete);

    act(() => {
      result.current.onAccept();
    });

    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
  });
});
