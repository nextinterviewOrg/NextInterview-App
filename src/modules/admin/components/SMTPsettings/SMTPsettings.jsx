import React from 'react';
import {
    FormContainer,
    Form,
    Formitem,
    Label,
    Input,
    ButtonGroup,
    Button,
    Heading
} from './SMTPsettings.styles';

const fields = [
    { name: 'host', label: 'Host', placeholder: 'smtp.gmail.com' },
    { name: 'port', label: 'Port', placeholder: '587', type: 'number', min: 0, max: 999 },
    { name: 'username', label: 'Username', placeholder: 'your_username' },
    { name: 'password', label: 'Password', placeholder: 'your_password', type: 'password' }
];


const SMTPSettings = () => (
    <FormContainer>
        <Heading>SMTP SERVER SETTINGS</Heading>
        <Form>
            {fields.map(({ name, label, placeholder, type = 'text', min, max }) => (
                <Formitem key={name}>
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        type={type}
                        min={min}
                        max={max}
                        onInput={(e) => {
                            if (name === 'port') {
                              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3); // Allow only digits
                            }
                            if (name === 'host') {
                              e.target.value = e.target.value.replace(/[0-9]/g, ''); // Remove digits
                            }
                          }}
                          
                    />
                </Formitem>
            ))}

            <ButtonGroup>
            <Button variant="submit" type="submit">Save</Button>
<Button variant="cancel" type="button">Cancel</Button>

            </ButtonGroup>
        </Form>
    </FormContainer>
);

export default SMTPSettings;
