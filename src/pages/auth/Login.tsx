import "./index.css";
import {Form, Input, Image} from "antd";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {isEmail} from "@/utils";
import {JWT_LOCAL_STORAGE_KEY} from "@/constants/data.ts";
import userService from "@/apis/service/userService";
import { AxiosError } from 'axios';
import { PrimaryButton } from "@/components";
import useUserInfo from "@/hooks/useUserInfo.ts";

const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate()
	const {setUserInfo} = useUserInfo()
	const handleLogin = async (values: {email: string, password: string}) => {
		const { email, password } = values;
		if (!isEmail(email)) {
			form.setFields([
				{
					name: 'email',
					errors: [('The input is not valid E-mail!')],
				}
			]);
			return;
		}
		
		try {
			const response = await userService.login(email, password);
			localStorage.setItem(JWT_LOCAL_STORAGE_KEY, response?.jwt);
			setUserInfo(response?.user);
			toast.success(('Đăng nhập thành công!'));
			navigate('/');
		} catch (error) {
			const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data?.message || ('Đăng nhập thất bại!');
			toast.error(errorMessage);
		}
	}
	return (
		<main className="auth-page">
			<div className="auth-card">
				<div className="auth-card-header">
					<div className={'flex justify-center'}>
						<Image
							width={150}
							src={'/logo.jpg'}
							preview={false}
							className={'rounded-full'}
						/>
					</div>
					<div className="auth-title">{('Xin chào')}</div>
					<p className="auth-description">
						Đăng nhập để tiếp tục
					</p>
				</div>
				<Form
					form={form}
					name="login"
					layout="vertical"
					onFinish={handleLogin}
				>
					<Form.Item
						style={{
							marginBottom: "2.5rem",
						}}
						label={<span className="text-base font-medium">{("Email")}</span>}
						name="email"
						rules={[
							{required: true, message: "Vui lòng nhập email!"},
						]}
					>
						<Input placeholder={("Email")} className="auth-form-input border-black"/>
					</Form.Item>
					
					<Form.Item
						label={<span className="text-base font-medium">{("Mật khẩu")}</span>}
						name="password"
						rules={[
							{required: true, message: "Vui lòng nhập mật khẩu!"},
						]}
					>
						<Input.Password
							placeholder={("Mật khẩu")}
							className="auth-form-input border-black"
						/>
					</Form.Item>
				</Form>
				<Link to={'/forgot-password'} className={'text-sm'}>
					Forgot password?
				</Link>
				<PrimaryButton
					type="submit"
					onClick={form.submit}
					className="auth-btn bg-black mt-3"
					size="large"
				>
					{("Đăng nhập")}
				</PrimaryButton>
				<div className={'mt-3 text-center'}>
					<span className={'text-sm'}>
						{("Chưa có tài khoản?")}
					</span>
					<Link to={'/register'} className={'text-blue-500 text-sm'}>
						{("Đăng ký")}
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Login;