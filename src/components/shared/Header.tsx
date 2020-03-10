import * as React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
} from '@ui-kitten/components';

type Props = {
  title: string;
  goBack?: () => void;
  rightControls?: [{ icon: string; action: () => void }];
};

const BackIcon = style => <Icon {...style} name="arrow-ios-back-outline" />;

const Header: React.FC<Props> = ({ title, goBack, rightControls }) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
  );

  const renderRightControls = () =>
    rightControls.map(rc => {
      const ControlIcon = style => <Icon {...style} name={rc.icon} />;
      return <TopNavigationAction icon={ControlIcon} onPress={rc.action} />;
    });

  return (
    <React.Fragment>
      <TopNavigation
        title={title}
        alignment="center"
        leftControl={goBack ? BackAction() : null}
        rightControls={rightControls ? renderRightControls() : null}
      />
      <Divider />
    </React.Fragment>
  );
};

export default Header;
