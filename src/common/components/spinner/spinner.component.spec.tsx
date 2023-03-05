import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  act,
  render,
  screen,
} from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import { trackPromise} from 'react-promise-tracker';


describe('common/components/spinner/spinner.component', () => {
    it('Test se muestra el componente y se oculta a los 3 segundos', async () => {
        // ARRANGE

        const timerPromise = jest.fn().mockImplementation(() => new Promise((r) => setTimeout(r, 3000)));
        jest.useFakeTimers();
        // ACT
        trackPromise(timerPromise());
        render(<SpinnerComponent />);

        expect(screen.getByRole("contentinfo")).toBeVisible();

        await act(
          async () => {
            jest.advanceTimersByTime(2000);
          }
        );

        expect(screen.getByRole("contentinfo")).toBeVisible();

        await act(
          async () => {
            jest.advanceTimersByTime(2000);
          }
        );

        // ASSERT
        expect(screen.queryByRole("contentinfo")).toBeNull();
    })
});
