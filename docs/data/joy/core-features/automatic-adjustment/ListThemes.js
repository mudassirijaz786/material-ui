import * as React from 'react';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';

const Select = styled('select')(({ theme }) => ({
  padding: '0.35rem',
  fontFamily: theme.vars.fontFamily.body,
  fontSize: theme.vars.fontSize.sm,
  borderRadius: theme.vars.radius.sm,
  border: '1px solid',
  borderColor: theme.vars.palette.neutral[300],
  ...theme.variants.soft.neutral,
}));

export default function ButtonThemes() {
  const [preset, setPreset] = React.useState('');
  const rootPresets = {
    dense: {
      '--List-item-minHeight': '27px',
      '--List-decorator-width': '28px',
      '--List-item-radius': '5px',
      '--List-gap': '5px',
      '--List-padding': '10px',
      '--List-item-paddingLeft': '5px',
      '--List-item-paddingRight': '5px',
      '--List-item-paddingY': '0px',
      '--List-item-fontSize': '14px',
      '--List-nestedInsetStart': '28px',
      '--List-decorator-color': 'var(--joy-palette-primary-plainColor)',
    },
    cozy: {
      '--List-radius': '20px',
      '--List-item-minHeight': '48px',
      '--List-padding': '8px',
      '--List-gap': '8px',
      '--List-nestedInsetStart': 'var(--List-decorator-width)',
    },
  };
  const nestedPresets = {
    dense: {
      '--List-nestedInsetStart': '0px',
    },
    cozy: {},
  };
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.5,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        borderRadius: '8px',
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'xs',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        <Box
          sx={{
            m: 'auto',
            border: '1px solid',
            borderColor: (theme) => theme.variants.outlinedHover.neutral,
            borderRadius: 'sm',
            overflow: 'auto',
            '& > *': {
              bgcolor: 'background.body',
            },
          }}
        >
          <List sx={preset ? rootPresets[preset] : {}}>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <ToggleOffRoundedIcon />
                </ListItemDecorator>
                Menu item 1
              </ListItemButton>
            </ListItem>
            <ListItem nested>
              <ListItemButton id="category-1">
                <ListItemDecorator>
                  <ArticleRoundedIcon />
                </ListItemDecorator>
                Menu item 2
              </ListItemButton>
              <List
                aria-labelledby="category-1"
                sx={preset ? nestedPresets[preset] : {}}
              >
                <ListItem>
                  <ListItemButton>Menu item 2.1</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Menu item 2.2</ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            pt: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FormLabel htmlFor="button-theme">Change the preset:</FormLabel>
          <Select
            id="button-theme"
            value={preset}
            onChange={(event) => setPreset(event.target.value)}
            sx={{
              minWidth: 160,
              border: '1px solid',
              borderColor: (theme) => theme.variants.outlinedHover.neutral,
            }}
          >
            <option value="">Default</option>
            <option value="dense">Dense</option>
            <option value="cozy">Cozy</option>
          </Select>
        </Box>
      </Box>
      {
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={`// The code is shorten to show only the markup and the sx value.
<List${
              preset
                ? `
  sx={{
    ${JSON.stringify(rootPresets[preset], null, 4)
      .replace('{', '')
      .replace('}', '')
      .trim()}
  }}
`
                : ''
            }>
  <ListItem nested>
    <ListItemButton>...</ListItemButton>
    <List${
      preset
        ? `
      sx={{
        ${JSON.stringify(nestedPresets[preset], null, 8)
          .replace('{', '')
          .replace('}', '')
          .trim()}
      }}
    `
        : ''
    }>
      <ListItem nested>
        <ListItemButton>...</ListItemButton>
        <List>
          <ListItem>...</ListItem>
          <ListItem>...</ListItem>
        </List>
      </ListItem>
      <ListItem>...</ListItem>
      <ListItem>...</ListItem>
    </List>
  </ListItem>
  <ListItem>...</ListItem>
</List>
`}
            copyButtonHidden
            language="jsx"
            sx={{
              display: { xs: 'none', md: 'block' },
              borderRadius: '7px',
            }}
          />
        </BrandingProvider>
      }
    </Box>
  );
}
