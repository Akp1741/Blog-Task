import { useNavigate, useParams } from 'react-router-dom';
import MDButton from 'components/MDButton';
import { useMaterialUIController } from 'context';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import React, { useEffect } from 'react';
import { Grid,  } from "@mui/material";
import { service } from "utils/Service/service";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDTypography from 'components/MDTypography';
import { useForm } from 'react-hook-form';
import globalMessages from 'utils/global';
import ErrorShow from 'common/ErrorShow';
import MDFileInput from 'common/MDFileInput';
import { requiredMessage, validateDescriptionLength, validateImage } from 'utils/common';

interface BlogFormProps {
    method: string;
}

interface BlogData {
    title: string;
    description: string;
    category: string;
    slug: string;
}
const BlogForm: React.FC<BlogFormProps> = ({ method }) => {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const history = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, getValues, formState: { errors }, setValue, trigger, watch, setError, clearErrors } = useForm<BlogData>();

    const fetchData = async () => {
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.Blog.get,
                params: id,
            });

            const blogdata: BlogData = response?.data.data;

            if (blogdata) {
                Object.entries(blogdata).forEach(([key, value]) => {
                    setValue(key as keyof BlogData, value);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, method]);


    const onSubmit = async (blogdata: BlogData) => {
        try {
            const formData = new FormData();
            Object.entries(blogdata).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (typeof value === "boolean") {
                        formData.append(key, value.toString());
                    } else {
                        formData.append(key, value);
                    }
                }
            });

            const apiMethod = method === 'POST' ? service.Methods.POST : service.Methods.PUT;
            const url = method === 'POST' ? service.API_URL.Blog.create : service.API_URL.Blog.update;
            await service.makeAPICall({
                methodName: apiMethod,
                apiUrl: url,
                params: id ?? '',
                body: formData,
                showAlert: true,
                options: {
                    headers: {
                        'Accept': '*',
                        'content-type': 'multipart/form-data',
                    }
                }
            });

            history(-1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={4} pb={3}>
                <Grid container spacing={1}>
                    <Grid item xs={15} className='module_wrap'>
                        <MDBox
                            className='module_head'
                            mx={2}
                            my={3}
                            mt={-3}
                            py={2}
                            px={2}
                            variant="gradient"
                            bgColor={sidenavColor}
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                {method === "POST" ? "Add" : "Update"}{" "}
                                {globalMessages.Blog.title}
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={3} component="form" role="form">
                            <MDBox mb={2} mx={1} display="flex" alignItems="center">
                                <MDTypography variant="button" fontSize={'0.7em'} fontWeight="regular" color="text" mr={1} sx={{ whiteSpace: "nowrap" }}>
                                    {globalMessages.Blog.title}
                                </MDTypography>
                                <MDInput
                                    my={1}
                                    InputLabelProps={id && getValues("title") && { shrink: watch('title') ? true : false }}
                                    {...register("title", { required: requiredMessage })}
                                    label={globalMessages.Blog.title}
                                    fullWidth
                                    value={watch("title") || ''}
                                    required
                                />
                            </MDBox>
                            {errors.title?.message && <ErrorShow error={errors.title?.message} />}
                            <MDBox mb={2} mx={1} display="flex" alignItems="center">
                                <MDTypography variant="button" fontSize={'0.7em'} fontWeight="regular" color="text"  mr={4} sx={{ whiteSpace: "nowrap" }}>
                                    {globalMessages.Blog.description_label}
                                </MDTypography>
                                <MDInput
                                    my={1}
                                    InputLabelProps={id && getValues("description") && { shrink: watch('description') ? true : false }}
                                    {...register("description", { required: requiredMessage, })}
                                    label={globalMessages.Blog.description_label}
                                    fullWidth
                                    value={watch("description") || ''}
                                    required
                                />
                            </MDBox>
                            {errors.description?.message && <ErrorShow error={errors.description?.message} />}
                            <MDBox mx={1} display="flex" alignItems="center" mb={2}>
                                <MDTypography variant="label" mr={1} fontSize={"0.8em"} fontWeight="regular"  color="text" sx={{ whiteSpace: "nowrap" }}>
                                    {globalMessages.Blog.category}
                                </MDTypography>
                                <MDInput
                                    my={1}
                                    InputLabelProps={id && getValues("category") && { shrink: watch('category') ? true : false }}
                                    {...register("category", { required: requiredMessage, })}
                                    label={globalMessages.Blog.category}
                                    fullWidth
                                    value={watch("category") || ''}
                                    required
                                />
                               
                            </MDBox>
                            {errors.category?.message && <ErrorShow error={errors.category?.message} />}
                            <MDBox mx={1} display="flex" alignItems="center" mb={2}>
                                <MDTypography variant="label" mr={1} fontSize={"0.8em"} fontWeight="regular"  color="text" sx={{ whiteSpace: "nowrap" }}>
                                    {globalMessages.Blog.slug}
                                </MDTypography>
                                <MDInput
                                    my={1}
                                    InputLabelProps={id && getValues("slug") && { shrink: watch('slug') ? true : false }}
                                    {...register("slug", { required: requiredMessage, })}
                                    label={globalMessages.Blog.slug}
                                    fullWidth
                                    value={watch("slug") || ''}
                                    required
                                />
                               
                            </MDBox>
                            {errors.slug?.message && <ErrorShow error={errors.slug?.message} />}
  
                            <MDBox className='action_wrap d_flex'>
                                <MDButton className='action-button' variant="gradient" color={sidenavColor} sx={{ mr: 2 }} onClick={handleSubmit(onSubmit)}>
                                    {method === 'POST' ? 'Add' : 'Update'} {globalMessages.Blog.save_button_text}
                                </MDButton>
                                <MDButton
                                    className='button grey'
                                    variant="gradient"
                                    color="error"
                                    onClick={() => history(-1)}
                                >
                                    {globalMessages.btn_text.cancel_button_text}
                                </MDButton>
                            </MDBox>
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default BlogForm;
