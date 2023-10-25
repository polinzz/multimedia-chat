import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FF9F2D',
  orangeLight: '#FFD098',
  black: '#000',
  greyDark: '#323232',
  grey: '#515151',
  greyLight: '#C0C0C0',
  background: '#FFFCFA',
}

export default StyleSheet.create({
  titleH1: {
    fontSize: 20,
    color: colors.primary,
    //lineHeight: '115%',
  },
  titleH2: {
    fontSize: 15,
  },
  paragraph: {
    fontSize: 12,
  },
  paragraphMini: {
    fontSize: 10,
  },
});
