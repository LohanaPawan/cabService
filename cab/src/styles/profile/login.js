import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    inputBox: {
        width: 300,
        height: 50,
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 0,
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },
    errorText: {
        color: "red",
        marginLeft: 0
    },
    inputBox: {
        width: 300,
        height: 50,
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 0,
        marginBottom: 10
    },
    loginText: {
        fontSize: 25,
        textAlign: "center",
        paddingLeft: 120,
        color: "#ffffff",
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: "#ffffff",
    },
    buttonStyle: {
        width: 300,
        height: 50,
        marginTop: 10,
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: "#5a3d55",
        borderRadius: 25

    },
    form: {
        marginLeft: '8%',
        marginTop: '20%'  
    },
    headerBody : {
        alignItems: 'center' 
    },
    headerBodyText : {
        fontSize: 20, color: 'white', fontWeight: 'bold'
    },
    pickerView : {
        alignItems: 'center',  color: 'white'
    },
    loginAsPicker : {
        width: 150, color: 'white'
    },
    inputText : {
        color: 'white'
    }, 
    forgotPasswordText: {
        marginLeft: 200, color: 'white', fontSize: 15, fontWeight: 'bold'
    }
})

export default styles 