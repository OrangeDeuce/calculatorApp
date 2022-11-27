import { useContext } from 'react';
import { Text, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Styles } from '../styles/GlobalStyles';

interface ButtonProps { //TypeScript type checking 4 all properties and 1 method 4 any new button instances that are created from the Button component
    onPress: () => void; // will take in an event handler that will not return anything
    title: string; // title will be a string value only
    isBlue?: boolean; // will be a boolean value only
    isGray?: boolean; // will be a boolean value only
    isNumber?: boolean, // To classify the button value as either a: Number? or a math operation?
    isOperation?: boolean, // To classify the button value as either a: Number? or a math operation?
}

export default function Button({ onPress, title, isBlue, isGray, isNumber, isOperation }: ButtonProps){ // Our Button component will require passing in  props as outlined by ButtonProps interface
    const theme = useContext(ThemeContext); // To call useContext that will make available our 'light' value and assigned to variable name 'theme'
    return (
        <Pressable  // 1 single Pressable button that can dynamically change appearance styling based on isBlue, isGrey or 'light'.
            style={
                isBlue
                ? Styles.btnBlue
                : isGray
                ? Styles.btnGray
                : theme === 'light'
                ? Styles.btnLight
                : Styles.btnDark 
            }
            onPress={onPress} // The event handler to pass in which dictates what this button will do
        >
            <Text // To dynamically change the Button Text depending on isGray, isBlue or 'dark'.
                style={
                    isBlue || isGray
                    ? Styles.smallTextLight
                    : theme === 'dark'
                    ? Styles.smallTextLight
                    : Styles.smallTextDark
                }
            >
                {title} {/*To pass in the title as props to label the button*/}
            </Text>
        </Pressable>
    );
};