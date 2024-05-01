import React from 'react';
import {StyleSheet, Modal as RNModal, ViewStyle, Platform} from 'react-native';

import {useTheme} from '../hooks/';
import {IModalProps} from '../constants/types';

import Blocks from './Blocks';
import Buttons from './Buttons';
import Images from './Images';

const Modal = ({
  id = 'Modal',
  children,
  style,
  onRequestClose,
  ...props
}: IModalProps) => {
  const {assets, colors, sizes} = useTheme();
  const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};
  // @ts-ignore
  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      style={modalStyles}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <Blocks justify="flex-end">
        <Blocks safe card flex={0} color="rgba(0,0,0,0.8)">
          <Buttons
            top={0}
            right={0}
            position="absolute"
            onPress={(event) =>onRequestClose?.(event)}>
            <Images source={assets.close} color={colors.white} />
          </Buttons>
          <Blocks
            flex={0}
            marginTop={sizes.xxl}
            paddingHorizontal={sizes.padding}>
            {children}
          </Blocks>
        </Blocks>
      </Blocks>
    </RNModal>
  );
};

export default React.memo(Modal);
