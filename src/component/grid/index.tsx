import { Avatar, Card, CardBody, Flex, Grid, GridItem, HStack, Stack, Text, Image, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { UserInfo } from "../userInfo";

export const GridLayout: FC<{ userData: Array<UserInfo>; onClick: (arg:UserInfo)=>void }> = ({ userData, onClick }) => {

    return (
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
            {userData.map((userInfo: UserInfo, index: number) => (
                <GridItem w='100%' h='300px' key={index}>
                    <Card maxW='100%' h='300px' backgroundColor={'#2551B3'} onClick={() => {onClick(userInfo)}} _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s' }}>
                        <CardBody>
                            <Flex justify="center" mt='3'>
                                <Avatar size="xl" src={userInfo?.picture?.large} border={'2px'} />
                            </Flex>
                            <Stack mt='3' align="center">
                                <VStack>
                                    <HStack>
                                    <Text color='white' fontSize={'24px'} fontWeight={400}>{`${userInfo?.name?.first} ${userInfo?.name?.last}`}</Text>
                                    <Image width={'24px'} height={'24px'} src={`https://flagcdn.com/${userInfo?.nat?.toLowerCase()}.svg`} ></Image>
                                    </HStack>
                                    <HStack mt={'9px'}>
                                    <UserInfo userData={userInfo}/>
                                    </HStack>
                                </VStack>
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>
            ))}
        </Grid>
    )

}
