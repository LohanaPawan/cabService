import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: 'rgba(238, 238, 238, 1)'
    },

    signupForm : {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 80,
    },
    inputBox: {
        width: 300,
        height: 40,
        padding: 10,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#ffffff",
    },
    buttonStyle : {
        width: 300,
        height: 50, 
        marginTop: 10,
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: "#5a3d55",
        borderRadius: 25
        
    },
    
        form: {
            marginLeft: 50,
            marginTop: 200
        }
    ,
 signupText: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    color: "white",
    fontStyle: 'italic',
    fontFamily: "open sans"
 },
 headerLeft: {
    color:'white'
 },
 headerBody: {
    color: 'white', fontSize: 20
 }
})

export default styles