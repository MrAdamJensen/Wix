/* @flow */

import Button from './Button';
import React, {Component} from 'react';

/*
Special properties for Dialog
-------------------------------
header: Dialog title
confirmLabel: dialog confirmation button label
modal: is dialog is a modal dialog
onAction: dialog confirmaition callback
hasCancel: is dialog includes a cancel button
children: dialog body
*/
type Props = {
  header: string,
  confirmLabel: string,
  modal: boolean,
  onAction: Function,
  hasCancel: ?boolean,
  children?: Array<any>,
};

/*
Dialog component which displays a dialog
*/
class Dialog extends Component<Props> {
  /*
  Fields types definitions 
  */
  props: Props;
  
  /*
  Default properties of component
  */
  static defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: () => {},
    hasCancel: true,
  };
  
  /*
  Executed before component is inserted into the DOM
  */
  componentWillUnmount() {
    // If dialog is a modal dialog, remove class to remove render body not in focus
    document.body.classList.remove('DialogModalOpen');
  }
  
  /*
  Executed after component was inserted into the DOM
  */
  componentDidMount() {
    // If dialog is a modal dialog, add class to render body not in focus
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }
  
  /*
  Dailog component render
  */
  render() {
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}> {/* Dialog style*/}
        <div className={this.props.modal ? 'DialogModalWrap' : null}> {/* Dialog style*/}
          <div className="DialogHeader">{this.props.header}</div> {/* Dialog title*/}
          <div className="DialogBody">{this.props.children}</div> {/* Dialog content*/}
          <div className="DialogFooter">                          {/* Dialog cancel, ok buttons*/}
            {
            // If cancel button requested, create it
            this.props.hasCancel                                 
              ? <span 
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  Cancel
                </span>
              : null
            }
            {/*OK button, if there is no cancel button then this is a dismiss button */}
            <Button onClick={this.props.onAction.bind(this,       
                this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog
