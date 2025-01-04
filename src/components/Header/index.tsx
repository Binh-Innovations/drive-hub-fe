import {JWT_LOCAL_STORAGE_KEY, LIST_HEADER_MENU} from "@/constants/data";
import {Flex, Image, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import PrimaryButton from "../Button/PrimaryButton";
import {Link as RouterLink} from 'react-router-dom'
import {Link as ChakraLink} from '@chakra-ui/react'
import useUserInfo from "@/hooks/useUserInfo.ts";
import {UserDropdown} from "@/components";

const Header = () => {
    const {userInfo, setUserInfo} = useUserInfo();
    const handleLogout = () => {
        setUserInfo(null);
        localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    }
    return (
        <header className="w-full h-16 px-4 shadow-xl flex justify-between items-center">
            <Flex alignItems={"center"} gap={2}>
                <Image
                    width={10}
                    height={10}
                    className={"object-cover rounded-xl"}
                    src="/logo.jpg"
                />
                <Text>DRIVE HUB</Text>
            </Flex>
            <Flex
                gap={5}
                display={{
                    base: "none",
                    md: "flex",
                }}
            >
                {LIST_HEADER_MENU.map((item: any) => {
                    return (
                        <Link to={item.url} key={item.label}>
                            <Text variant={"body-default"}>{item.label}</Text>
                        </Link>
                    );
                })}
            </Flex>
            {
                userInfo ? (
                    <Flex gap={2} alignItems={'center'}>
                        <UserDropdown
                            userInfo={userInfo}
                            onLogout={handleLogout}
                        />
                        {/*<Text variant={'body-default'}>{userInfo?.email}</Text>*/}
                        {/*<PrimaryButton>*/}
                        {/*    Đăng xuất*/}
                        {/*</PrimaryButton>*/}
                    </Flex>
                ) : (
                    <Flex gap={2} alignItems={'center'}>
                        <ChakraLink as={RouterLink} to="/login">
                            <PrimaryButton>
                                Đăng nhập
                            </PrimaryButton>
                        </ChakraLink>
                        <ChakraLink
                            as={RouterLink}
                            to="/register"
                            color='primary.600'
                            variant={'body-default-bold'}
                            cursor={'pointer'}
                        >
                            Đăng ký tài khoản
                        </ChakraLink>
                    </Flex>
                )
            }
        </header>
    );
};

export default Header;
