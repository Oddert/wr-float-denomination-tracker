const standard = {
	h: 'auto !important',
	fontWeight: "normal",
	lineHeight: 'normal',
	// height: '0.7em',
	color: 'theme_light.text.contrastGreen',
	border: "2px solid",
	borderColor: "waitrose.primary",
	bgColor: "waitrose.primary",
	p: "8px 16px",
	margin: '0 4px',
	_hover: {
		borderColor: '#7EC507',
		bgColor: '#7EC507',
	},
	_active: {
		borderColor: 'waitrose.bgDark',
		bgColor: 'waitrose.bgDark',
	},
}

const Button = {
  // The styles all button have in common
  baseStyle: {
		...standard
	},
  // Two sizes: sm and md
  sizes: {
    sm: {
			h: 'auto !important',
      fontSize: "12px",
      p: "4px 4px",
      padding: "4px 4px",
			borderRadius: '.15rem',
    },
    md: {
      fontSize: "16px",
      p: "8px 16px",
    },
  },
  // Two variants: outline and solid
  variants: {
		standard,
		link: {
			border: 'none',
			background: 'none',
			textDecoration: 'none',
			cursor: 'pointer',
			color: 'waitrose.primary',
			_hover: {
				textDecoration: 'none',
				bg: 'none',
				color: 'theme_light.text.clickable',
			},
			_active: {
				color: '#7EC507',
				bg: 'none',
				textDecoration: 'none',
			},
		},
    outline: {
			color: 'theme_light.text.contrastGreen',
      border: "2px solid",
      borderColor: "waitrose.primary",
      bgColor: "waitrose.primary",
			fontWeight: 'normal',
			padding: '16px 24px',
			margin: '0 4px',
    },
    solid: {
      bg: "green.500",
      color: "white",
    },
		ui: {
			border: '2px solid',
			marginY: '2px',
			borderColor: '#EAEAEA',
			h: 'auto',
			bgColor: '#EAEAEA', // formally #f3f3f3
			color: 'theme_light.text.standard',
			_hover: {
				borderColor: '#D3D3D3',
				bgColor: '#D3D3D3',
				color: 'theme_light.text.darker'
			},
			_active: {
				borderColor: '#C4C4C4',
				bgColor: '#C4C4C4',
			},
			_focus: {
				boxShadow: '0 0 0 2px #5EAFFB',//'0 0 0 2px rgba(22, 129, 191, .6)',
				borderColor: '#5EAFFB',
			}
		},
		transparent: {
			bgColor: 'none',
			borderColor: 'waitrose.primary',
			color: 'waitrose.primary',
			_hover: {
				color: 'white',
				borderColor: 'waitrose.primary',
				bgColor: 'waitrose.primary',
			},
			_active: {
				color: 'white',
				bgColor: 'waitrose.bgDark',
				borderColor: 'waitrose.bgDark'
			},
		},
		primary: {
			borderRadius: '20px',
		},
		warning: {},
		danger: {
			bgColor: 'theme_light.ui.danger',
			borderColor: 'theme_light.ui.danger',
			color: '#ffffff',
			_hover: {
				bgColor: 'theme_light.ui.dangerLight',
				borderColor: 'theme_light.ui.dangerLight',
				// color: '#ffffff',
			},
			_active: {
				bgColor: 'theme_light.ui.dangerDark',
				borderColor: 'theme_light.ui.dangerDark',
				// color: '#ffffff',
			},
		},
		dangerOutline: {
			bg: 'none',
			border: '2px solid',
			borderColor: 'theme_light.ui.danger',
			color: 'theme_light.ui.danger',
			_hover: {
				bgColor: 'theme_light.ui.danger',
				borderColor: 'theme_light.ui.danger',
				color: '#ffffff',
			},
			_active: {
				bgColor: 'theme_light.ui.dangerDark',
				borderColor: 'theme_light.ui.dangerDark',
				// color: '#ffffff',
			},
		},
		dangerLink: {
			bg: 'none',
			border: '2px solid',
			borderColor: 'rgba(0,0,0,0)',
			fontWeight: 'bold',
			color: 'theme_light.ui.danger',
			_hover: {
				bg: 'none',
				borderColor: 'rgba(0,0,0,0)',
				color: 'theme_light.ui.dangerLight',
			},
			_active: {
				bg: 'none',
				borderColor: 'rgba(0,0,0,0)',
				color: 'theme_light.ui.dangerDark',
			},
		},
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "standard",
		h: 'auto',
  },
}

export default Button