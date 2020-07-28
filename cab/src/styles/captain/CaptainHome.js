import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    txtStyle: {
        margin: 30,
        fontSize: 20
    }, map: {
        ...StyleSheet.absoluteFillObject,
        height: 700,
        width: 390

    }, container: {
        ...StyleSheet.absoluteFillObject,

    },
    detailBox: {
        backgroundColor: "#000066",
        marginTop: 440,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "white",
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "white",
    },
    btnStyle: {
        width: 300,
        height: 50,
        marginTop: 5,
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: "#000066",//"rgba(8, 0, 163, 1)",
        borderRadius: 25,
        marginLeft: 45,

    },
    approvView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 45,
        marginRight: 45

    },
    buttonStyle: {
        flex: 1,
        justifyContent: "center",
        width: 50,
        height: 40,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: "#000066",//"rgba(8, 0, 163, 1)",
        borderRadius: 25,
    },
    headerLeft: {
        color: 'white'
    },
    headerBody: {
        color: 'white', fontSize: 20, marginLeft: 30
    },
    headerRight: {
        color: 'white', fontSize: 20
    },
    activityIndicatorView: {
        alignItems: 'center', marginTop: 500
    },
    activityText: {
        fontSize: 15, color: 'brown', fontWeight: 'bold'
    },
    joinButton: {
        color: 'white', fontSize: 30,
        fontWeight: 'bold', marginLeft: 170
    }
})

export default styles 