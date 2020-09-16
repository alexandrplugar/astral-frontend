import { withStyles } from '@astral-frontend/styles';

const GlobalCSS = () => null;

export default withStyles(
  theme => ({
    '@global': {
      html: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        boxSizing: 'border-box',
        fontSize: theme.typography.htmlFontSize,
      },
      'html, body, #root': {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
      },
      body: {
        backgroundColor: theme.palette.background.default,
        ...theme.typography.body2,
        '@media print': {
          backgroundColor: theme.palette.common.white,
        },
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit',
      },
      'div, table, nav, aside, form, ul, span, li': {
        '&::-webkit-scrollbar': {
          width: '5px',
          height: '5px',
          background: 'transparent',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '3px',
          background: 'rgba(0, 0, 0, 0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#aaa',
          borderRadius: '2px',
        },
      },
    },
  }),
  { name: 'GlobalCSS' },
)(GlobalCSS);
