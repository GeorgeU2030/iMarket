import { View, Text, FlatList,Image } from 'react-native'
import React from 'react'

export default function Slider() {

    const DATA = [
        {
         image:"data:image/png;base64,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"
        },
        {
         image:"https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/04/319272-microsoft-detalla-contenidos-xbox-originals.jpg?tf=3840x"
        },
        {
         image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/2048px-Xiaomi_logo.svg.png"
        },
        {
         image:"https://cdn.ipadizate.com/2018/02/37150.png"
        }
    ];

    return (
        <View className="mt-8">
            <FlatList
                data={DATA}
                horizontal={true}
                renderItem={({item}) => (
                    <View>
                        <Image source={{uri: item.image}} className="h-56 w-[330px] object-contain mr-3" />
                    </View>
                )}
            />
        </View>
    );
}