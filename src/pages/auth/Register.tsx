import "./index.css";
import {Form, Input, Image} from "antd";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import userService from "@/apis/service/userService";
import { AxiosError } from 'axios';
import { PrimaryButton } from "@/components";

const Register = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate()
	const handleRegister = async (values: { email: string, password: string, confirmPassword: string }) => {
		const { email, password, confirmPassword } = values;
		if (password !== confirmPassword) {
			form.setFields([{ name: 'confirmPassword', errors: ["Mật khẩu không khớp!"] }]);
			return;
		}
		
		try {
			await userService.register(email, password);
			toast.success("Đăng ký thành công!");
			navigate('/login');
		} catch (error) {
			const errorMessage = (error as AxiosError<{ message: string }>)?.response?.data?.message ||
				"Đăng ký thất bại!";
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
						Đăng ký tai khoản để tiếp tục
					</p>
				</div>
				<Form
					form={form}
					name="register"
					layout="vertical"
					onFinish={handleRegister}
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
						style={{
							marginBottom: "2.5rem",
						}}
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
					
					<Form.Item
						label={<span className="text-base font-medium">
							{("Nhập lại mật khẩu")}
						</span>}
						name="confirmPassword"
						rules={[
							{required: true, message: "Vui lòng nhập lại mật khẩu!"},
						]}
					>
						<Input.Password
							placeholder={("Nhập lại mật khẩu")}
							className="auth-form-input border-black"
						/>
					</Form.Item>
				</Form>
				
				<PrimaryButton
					type="submit"
					onClick={form.submit}
					className="auth-btn bg-black mt-3"
					size="large"
				>
					{("Đăng ký")}
				</PrimaryButton>
				<div className={'mt-3 text-center'}>
					<span className={'text-sm'}>
						{("Đã có tài khoản?")}
					</span>
					<Link to={'/login'} className={'text-blue-500 text-sm'}>
						{("Đăng nhập")}
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Register;