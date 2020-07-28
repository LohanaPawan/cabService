import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
        color: "brown",
        fontWeight: "bold",
        fontStyle: 'italic',
        fontFamily: "open sans"   
},
container: {
    backgroundColor: 'rgba(238, 238, 238, 1)',
    flex: 1,
},
form : {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    },
inputBox: {
    width: 300,
    height: 40,
    padding: 10,
    // backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "white"

},
buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: "#ffffff",
},
buttonLastStyle: {
    width: 310,
    height: 50,
    marginTop: 10,
    paddingVertical: 10,
    marginBottom: 10,

    backgroundColor: "#4a47a3",
    borderRadius: 25
},
buttonStyle: {
    width: 150,
    height: 50,
    marginTop: 10,
    paddingVertical: 10,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: "#4a47a3",
    borderRadius: 25

},
headerLeft : {
    color: 'white'
},
headerBody: {
    color: 'white', fontSize: 20
},
headerRight : {
    color: 'white', fontSize: 20
}, 

heading : {
    fontSize: 20, color: 'white', marginTop: 10, marginLeft: 120
},

addCarLogo: {
    width: 100,
height: 100, marginTop: 20, marginLeft: 150
},

pleaseWaitText: {
    color: 'white', fontSize: 20
}
})

export default styles 