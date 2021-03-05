import React from 'react'
import { 
  GridItem, 
  Grid,
  Input,
  Textarea,
  Select,
  Button,
  Divider,
  Text,
  RadioGroup,
  Radio,
  // Stack,
  Heading,
  useStyleConfig, 
  FormLabel,
} from '@chakra-ui/react'

import Nav from './Nav/'
import Header from './Header/'

const Dashboard: React.FC = () => {
  const btnVarOne = useStyleConfig('Button', { variant: 'solid' })
  const btnVarTwo = useStyleConfig('Button', { variant: 'outline', size: 'sm' })

  return (
    <Grid 
      className="Page-Dashboard"
      templateColumns='15vw 1fr'
      templateRows='auto 1fr'
      h='100vh'
    >
      <Header title='All Counts' />
      <GridItem
        rowStart={1}
        rowEnd={-1}
      >
        <Nav />
      </GridItem>
      <GridItem 
        w='50%' 
        bg='waitrose.bgLight'
        colStart={2}
        colEnd={2}
        rowStart={2}
        rowEnd={2}
        className='box-missbehaving'
      >
        {/* <Input placeholder='watrose.com' />
        <Textarea placeholder='description of the repository' />
        <Select placeholder='a dropdown'>
          <option value='opt1'>Option One</option>
          <option value='opt2'>Option Two</option>
          <option value='opt3'>Option Three</option>
        </Select>
        <Button>
          Default Button
        </Button>
        <Button sx={btnVarOne}>
          Button variant 1
        </Button>
        <Button sx={btnVarTwo}>
          Button variant 2
        </Button>
        <Text>Some text</Text>
        <Divider />
        <RadioGroup defaultValue='1'>
          <Stack spacing={4} direction='row'>
            <Radio value='1' isDisabled>Radio 1</Radio>
            <Radio value='2'>Radio 1</Radio>
            <Radio value='3'>Radio 1</Radio>
          </Stack>
        </RadioGroup>
        <Heading as='h1' size='4xl'>Kings Cross Station h1</Heading>
        <Heading as='h1' size='3xl'>Kings Cross Station h1</Heading>
        <Heading as='h2' size='2xl'>Kings Cross Station h2</Heading>
        <Heading as='h3' size='xl'>Kings Cross Station h3</Heading>
        <Heading as='h4' size='lg'>Kings Cross Station h4</Heading>
        <Heading as='h5' size='md'>Kings Cross Station h5</Heading>
        <Heading as='h6' size='sm'>Kings Cross Station h6</Heading> */}
        <Heading as='h1' size='2xl'>Page Title</Heading>
        <Heading as='h2' size='lg'>Section Heading</Heading>
        <Heading as='h3' size='md'>Standard Text</Heading>
        <Heading as='h4' size='sm'>Info Text</Heading>
        <Text>Bulk text will appear like so</Text>
        <FormLabel>Bulk text will appear like so</FormLabel>
        <Text>Faded unreadable text</Text>
        <Input plceholder='User Input' />
        <Textarea placeholder='description of the repository' />
        <Button>UI Button</Button>
        <div>Search Bar...</div>
        <Select placeholder='a dropdown'>
          <option value='opt1'>Option One</option>
          <option value='opt2'>Option Two</option>
          <option value='opt3'>Option Three</option>
        </Select>
        <input type="date"/>
        <input type="time"/>
        <RadioGroup defaultValue='readio-one'>
          <Radio value='radio-one'>Radio Option One</Radio>
          <Radio value='radio-two'>Radio Option Two</Radio>
          <Radio value='radio-three'>Radio Option Three</Radio>
        </RadioGroup>
        <Divider orientation='horizontal' />
      </GridItem>
    </Grid>
  )
}

export default Dashboard