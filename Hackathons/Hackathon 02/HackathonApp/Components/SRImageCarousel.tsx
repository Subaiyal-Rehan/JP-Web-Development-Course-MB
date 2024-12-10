import React, { useState, useRef, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import rncStyles from 'rncstyles';

const { width } = Dimensions.get('window');

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<any>(null);

    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
                }
                setCurrentIndex(nextIndex);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [currentIndex, images.length]);

    const onViewableItemsChanged = useRef<any>(({ viewableItems }: any) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                ref={flatListRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index: number) => index.toString()}
                renderItem={() => {
                    return (
                        <View style={[rncStyles.positionRelative]}>
                            <Image source={require('../assets/Pasta.png')} style={[styles.image]} />
                            <View style={[styles.customColor, rncStyles.positionAbsolute, rncStyles.p2]}>
                                <Text style={[rncStyles.fs1, rncStyles.textWhite, rncStyles.textBold]}>30% OFF</Text>
                                <Text style={{color: 'grey'}}>Discover discounts in your favorite local restaurants</Text>
                                <TouchableOpacity style={[rncStyles.w40, rncStyles.bgPrimary, rncStyles.py1, rncStyles.rounded]}>
                                    <Text style={[{color: 'white'}, rncStyles.textCenter]}>Order Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
            <View style={styles.dotsContainer}>
                {images.map((_, index: number) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 200,
        resizeMode: 'cover',
        opacity: 0.6,
    },
    dotsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#333',
    },
    customColor: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: '100%',
        justifyContent: 'center',
        gap: 10,
    },
});

export default ImageCarousel;
