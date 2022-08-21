import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import Button from './Button'
import { useTheme, Dialog, Paragraph, Portal } from 'react-native-paper';


const Popup = ({ show, onPress, description, title }) => {
    const { colors } = useTheme();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <>
            <View style={styles.mainContainer}>
                <Portal>
                    <Dialog visible={show} onDismiss={onPress}>
                        <View style={[styles.child1, { backgroundColor: colors.primary }]}>
                            <Dialog.Title style={[styles.child1Text, { color: colors.secondary }]}>{title}</Dialog.Title>
                        </View>
                        <Dialog.Content style={[styles.child2, { backgroundColor: colors.secondary }]}>
                            <Paragraph style={[styles.child2Text, { color: colors.tertiary }]}>{description}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                            <Button title='Ok' btntextstyle={{ color: colors.secondary }} btnstyle={{ height: 40, backgroundColor: colors.primary, width: '50%' }} onPress={onPress} />
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        // position: "absolute",
        // top: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
    },
    child1: {
        width: '100%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    child1Text: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 23,
        textAlign: 'center'
    },
    child2: {
        padding: 20,
        justifyContent: 'space-around',
    },
    child2Text: {
        textAlign: 'center',
        lineHeight: 18,
        fontSize: 16,
        fontWeight: '400',
    },
    button: {
        height: 41,
        width: '50%',
        alignSelf: 'center'
    }
})
export default Popup