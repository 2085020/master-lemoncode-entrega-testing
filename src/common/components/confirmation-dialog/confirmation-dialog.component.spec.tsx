import React from 'react';
import {findAllByText, getByText, render, screen} from '@testing-library/react';
import { ConfirmationDialogComponent, LabelProps, Props } from './confirmation-dialog.component';

describe('common/component/confirmation-dialog.component', () => {
    it('Should dialog be shown in the screen where isOpen is true', () => {
        // ARRANGE
        const props :Props = {
          isOpen: true,
          onAccept: jest.fn(),
          onClose: jest.fn(),
          title: "The Title",
          labels: {
            closeButton:"Close",
            acceptButton: "Accept"
          },
          children:""
        }
        // ACT
          render(<ConfirmationDialogComponent {...props} />)
        // ASSERT
        const h2Element = screen.getByRole("heading", {level: 2});
        expect(h2Element).toBeInTheDocument();
    })

    it('Should dialog not be shown in the screen where isOpen is false', () => {
      // ARRANGE
      const props :Props = {
        isOpen: false,
        onAccept: jest.fn(),
        onClose: jest.fn(),
        title: "The Title",
        labels: {
          closeButton:"Close",
          acceptButton: "Accept"
        },
        children:""
      }
      // ACT
        render(<ConfirmationDialogComponent {...props} />)
      // ASSERT
      screen.debug();
      const h2Element = screen.queryAllByRole("heading", {level: 2});
      expect(h2Element).toHaveLength(0);
  })
});
