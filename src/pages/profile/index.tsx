import React from 'react'
import { Avatar, Card, CardBody, Flex, HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedUserInfo } from 'src/store/selectors/features/user';
import { setSelectedUserData } from 'src/store/slices/features';
import { Maps } from 'src/component/maps/indes';
import { UserInfo } from 'src/component/userInfo';
import { BLUE, WHITE } from 'src/constants/colors';



export const Profile =() =>{
  const dispatch = useDispatch();
  const userInfo: UserInfo = useSelector(getSelectedUserInfo);
  const handleBackNavigation = () => {
    dispatch(setSelectedUserData({}));
  };

    return (
        <>
        <Flex alignItems='flex-start' direction='row'mb={'10px'}>
        <IconButton variant="outline" aria-label="Search database"  icon={<ChevronLeftIcon boxSize={'24px'}/>}
        onClick={handleBackNavigation}/>
        </Flex>
        <Card maxW='100%' backgroundColor={ BLUE } >

          <CardBody>
            <Flex justify="center" mt='3'>
              <Avatar size="xl" src={userInfo?.picture?.large} border={'2px'} />
            </Flex>
            <Stack mt='3' align="center">
              <Text color='white' fontSize={'16px'} fontWeight={400}>Hi, my name is </Text>
              <HStack>
              <Text color='white' fontSize={'32px'} fontWeight={600}>{`${userInfo?.name?.first} ${userInfo?.name?.last}`}</Text>
              <Image width={'30px'} height={'30px'} src={`https://flagcdn.com/${userInfo?.nat?.toLowerCase()}.svg`} ></Image>
              </HStack>
            </Stack>
            <Flex justify="center" mt="6">
              <UserInfo userData={userInfo}/>
            </Flex>

          </CardBody>
        </Card>
        <Card maxW='100%' backgroundColor={WHITE} mt={'24px'}>
          <CardBody>
              <Maps position={([Number(userInfo?.location?.coordinates?.latitude),Number(userInfo?.location?.coordinates?.latitude)])}
              userName={userInfo?.name?.first as string}/>
          </CardBody>
        </Card>
        </>
    )
}

