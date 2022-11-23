import * as React from 'react';
import Button from './Button';
import { View, Text } from 'react-native';
import { Styles } from '../styles/GlobalStyles';
import { myColors } from '../styles/Colors';

export default function MyKeyboard() {
    const [firstNumber, setFirstNumber] = React.useState(""); // Tracks when user keys in first number value
    const [secondNumber, setSecondNumber] = React.useState(""); // Tracks when user keys in second number value (Right before a math operation)
    const [operation, setOperation] = React.useState(""); // For any subsequent math operation that may come after 2nd number value is input
    const [result, setResult] = React.useState<Number | null>(null); // To calculate and display results of math operation(s)

    const handleNumberPress = (buttonValue: string) => { // Event handler that handles when Number Buttons are pressed. Represented by 'title' prop.
        if (firstNumber.length < 12) { // Checkpoint if the state value's length is less than max 12 digits
            setFirstNumber(firstNumber + buttonValue); // To set new state of firstNumber by concatenating previous state value with new value of the button just pressed ('title').
            console.log(`firstNumber is ${firstNumber}`)
        }
        if (operation !== "") {
            setFirstNumber(buttonValue)
            console.log('No operation yet')
        }
        if (secondNumber.length < 12) {
            setSecondNumber(firstNumber + operation + buttonValue) // but dont display the operation yet unless ...
            console.log(`secondNumber is ${secondNumber}`)
        }
    };


    const handleOperationPress = (buttonValue: string) => { // Event handler that handles when math operations are pressed (Right after full firstNumber is input). Represented by button's 'title' prop.
        setOperation(buttonValue); // To first call setOperation with buttonValue / 'title' passed in to change local state of 'operation'. Will est. what math operation to perform.
        setSecondNumber(firstNumber) // then to properly display the 2nd input Number in this math operation. Also transfers/holds onto value of firstNumber for reference.
        // setFirstNumber(''); //To reset firstNumber so the display clears it out to '0'
    };

    const handlePercent = () => { //Event handler for handling % formatting on displayed Number values
        clear();
        const decimalNum = parseFloat(firstNumber) * 0.01;
        setSecondNumber(decimalNum.toString()); 
    };



    const clear = () => { // Event handler to clear all local state values back to '' and null
        setFirstNumber('');
        setSecondNumber('');
        setOperation('');
        setResult(null);
    };

    const getResult = () => { // Event handler to handle final calculation after Numbers and math operations selected. Takes in the 'operation' arg and reads the 'secondNumber' and 'firstNumber'.
        switch (operation) {
            case "+": // Addition operation
                // clear(); // to first clear out all local state variables back to ''
                setResult(parseInt(secondNumber) + parseInt(firstNumber)); // to set new state variable 'result' to a new value: After converting strings to integers, its the sum of the integers.
                break; // To halt any further switch operation from being parsed.
            case "-":  // Subtraction operation
                // clear();
                setResult(parseInt(secondNumber) - parseInt(firstNumber));
                break;
            case "*":  // Multiplication operation
                // clear();
                setResult(parseInt(secondNumber) * parseInt(firstNumber));
                break;
            case "÷":  // Division operation
                // clear();
                setResult(parseInt(secondNumber) / parseInt(firstNumber));
                break;
            // case "%":
            //     clear();
            //     const percentNum = parseInt(firstNumber) * .01;
            //     setFirstNumber(percentNum.toString());
            //     break;
            // case "+/-":
            //     clear();
            //     const negNum = -Math.abs(parseInt(firstNumber));
            //     setFirstNumber(negNum.toString()); 
            //     break;
            // default:
            //     clear();
            //     setResult(0);
            //     break;
        }
    };

    const firstNumberDisplay = () => { // Logic to properly display the Number inputs typed into keypad (What gets displayed in larger box display - and HOW to display it.)
        if(result !== null) { // Scenario 1: If a completed calculation sets a new 'result' state value that now exists (as a 'string'). And to conditionally display the following:
            return (
                <Text
                    style={
                        result < 99999 // Scenario 1A: final result is 5 digits or less: 
                        ? [Styles.screenFirstNumber, {color: myColors.result}] // fontSize will be 96 (GlobalStyles)
                        : [Styles.screenFirstNumber, {color: myColors.result, fontSize: 50}] // Scenario 1B: final result is > 5 digits
                    }
                >
                    {result?.toString()} {/*Once styling is applied, to convert integer result to a string to render*/}
                </Text>
            );
        }
        
        if(firstNumber && firstNumber.length < 6) { //Scenario 2: If a state value exists at 'firstNumber' AND its less than 6 digits...
            return (
                <Text
                    style={Styles.screenFirstNumber}
                >
                    {firstNumber} {/*To apply one basic styling all firstNumber values less than 6 digits*/}
                </Text>
            );
        }

        // if(firstNumber && operation && firstNumber.length < 6) { //Scenario 3: 
        //     return (
        //         <Text style={Styles.screenFirstNumber}>
        //             {firstNumber}
        //         </Text>
        //     );
        // }

        if(firstNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>; // Scenario 3: What to display by default ('0') if no number is typed in at all ('')
        }

        if(firstNumber.length > 5 && firstNumber.length < 8) { // Scenario 4: firstNumber length bet. 6 to 7 digits.
            return <Text style={[Styles.screenFirstNumber, {fontSize: 70}]}>{firstNumber}</Text>;
        }

        if(firstNumber.length > 7) { // Scenario 5: firstNumber length bet. 8 to 12 digits max (max set earlier in handleNumberPress())
            return <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>{firstNumber}</Text>;
        }
    };

    return(
        <View style={Styles.viewBottom}>
            <View  
                style={{
                    height: 'auto',
                    width: "90%",
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    borderColor: 'blue',
                    borderWidth: 2
                }}
            >  
                <Text style={Styles.screenSecondNumber}>  
                    {secondNumber}
                    <Text>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}> 
                <Button title='C' isGray onPress={clear} />
                <Button title='+/-' isGray onPress={() => getResult()} />
                <Button title='%' isGray onPress={() => handlePercent()} />
                <Button title='÷' isBlue onPress={() => handleOperationPress('÷')} />
            </View>
            <View style={Styles.row}>
                <Button title='7' onPress={() => handleNumberPress('7')} />
                <Button title='8' onPress={() => handleNumberPress('8')} />
                <Button title='9' onPress={() => handleNumberPress('9')} />
                <Button title='x' isBlue onPress={() => handleOperationPress('*')} />
            </View>
            <View style={Styles.row}>
                <Button title='4' onPress={() => handleNumberPress('4')} />
                <Button title='5' onPress={() => handleNumberPress('5')} />
                <Button title='6' onPress={() => handleNumberPress('6')} />
                <Button title='-' isBlue onPress={() => handleOperationPress('-')} />
            </View>
            <View style={Styles.row}>
                <Button title='1' onPress={() => handleNumberPress('1')} />
                <Button title='2' onPress={() => handleNumberPress('2')} />
                <Button title='3' onPress={() => handleNumberPress('3')} />
                <Button title='+' isBlue onPress={() => handleOperationPress('+')} />
            </View>
            <View style={Styles.row}>
                <Button title='.' onPress={() => handleNumberPress('.')} />
                <Button title='0' onPress={() => handleNumberPress('0')} />
                <Button title='⌫' onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title='=' isBlue onPress={() => getResult()} />
            </View>
        </View>
    )
}; 