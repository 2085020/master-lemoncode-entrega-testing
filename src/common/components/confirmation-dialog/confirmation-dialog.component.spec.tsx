import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  findAllByText,
  getByText,
  render,
  screen,
} from '@testing-library/react';
import {
  ConfirmationDialogComponent,
  LabelProps,
  Props,
} from './confirmation-dialog.component';

describe('common/component/confirmation-dialog.component', () => {
  it('Should dialog be shown in the screen where isOpen is true', () => {
    // ARRANGE
    const props: Props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: '',
    };
    // ACT
    render(<ConfirmationDialogComponent {...props} />);
    // ASSERT
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).toBeInTheDocument();
    expect(h2Element.textContent).toEqual("The Title");
  });

  it('Should dialog not be shown in the screen where isOpen is false', () => {
    // ARRANGE
    const props: Props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: '',
    };
    // ACT
    render(<ConfirmationDialogComponent {...props} />);
    // ASSERT

    const h2Element = screen.queryAllByRole('heading', { level: 2 });
    expect(h2Element).toHaveLength(0);
  });

  it('Should dialog show children defined in the screen props ', async () => {
    // ARRANGE
    const props: Props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: <span>hello test</span>,
    };
    // ACT
    render(<ConfirmationDialogComponent {...props} />);
    // ASSERT

    const h2Element = await screen.findByText('hello test');
    expect(h2Element).toBeInTheDocument();
  });

  it('Should execute on accept and onClose when user clicks accept', async () => {
    // ARRANGE
    const onAccept = jest.fn();
    const onClose = jest.fn();
    const props: Props = {
      isOpen: true,
      onAccept: onAccept,
      onClose: onClose,
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: '',
    };
    // ACT
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[1].textContent).toEqual(props.labels.acceptButton);
    await userEvent.click(buttons[1]);
    // ASSERT

    expect(onAccept).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('Should execute onClose and not onAccept when user clicks close', async () => {
    // ARRANGE
    const onAccept = jest.fn();
    const onClose = jest.fn();
    const props: Props = {
      isOpen: true,
      onAccept: onAccept,
      onClose: onClose,
      title: 'The Title',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      children: '',
    };
    // ACT
    render(<ConfirmationDialogComponent {...props} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toEqual(props.labels.closeButton);
    await userEvent.click(buttons[0]);
    // ASSERT
    expect(onAccept).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
