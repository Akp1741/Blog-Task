import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, Grid, Switch } from "@mui/material";
import Confirm from "../../common/ConfirmModal";
import { IconButton, Card } from "@mui/material";
import { service } from "utils/Service/service";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import Footer from 'examples/Footer';
import MDButton from 'components/MDButton';
import { useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom';
import MDInput from 'components/MDInput';
import globalMessages from 'utils/global';
import { Add } from '@mui/icons-material';

// interface for listing 
interface BlogType {
    id: number;
    title: string;
    category: boolean;
    description: string;
    slug: string;
}

const BlogList: React.FC = () => {
    // necessary states and variables
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [filter, setFilter] = useState({ search: "", is_active: "" });
    const history = useNavigate();
    const [updateOpen, setUpdateOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<BlogType[]>([]);
    const [index, setIndex] = useState<number[] | undefined>(undefined);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const [options, setOptions] = useState([]);

    // columns of table
    const columns = [
        {
            Header: 'Action',
            align: 'center',
            Cell: (record: any) => {
                const id = record.row.original.id;
                const isChecked = selectedId.includes(id);
                return (
                    <>
                        {
                            <Checkbox
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(id)}
                            />
                        }

                        {
                            <IconButton
                                onClick={() =>
                                    handleNavigateUpdate(record.row.original.id)
                                }
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        }
                        {

                            <IconButton
                                onClick={() =>
                                    handleToggleDelete(record.row.original.id)
                                }
                            >
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        }
                    </>
                );
            }
        },
        { Header: "ID", accessor: "id", align: "center" },

        {
            Header: " Blog Title",
            accessor: "title",
            align: "center",
            width: 150,
        },
        { Header: "Description", accessor: "description", align: "center" },
        { Header: "Category", accessor: "category", align: "center" },
        { Header: "Slug", accessor: "slug", align: "center" },
    ];

    const fetchData = async () => {
    
        try {
            const response = await service.makeAPICall({
                methodName: service.Methods.GET,
                apiUrl: service.API_URL.Blog.list,
            });

            setRows(Array.isArray(response?.data?.data) ? response?.data?.data : []);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [filter])

    // function to handle selected categories
    const handleCheckboxChange = (id: number) => {
        setSelectedId((prevSelectedId) => {
            if (prevSelectedId.includes(id)) {
                return prevSelectedId.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedId, id];
            }
        });
    };

    // function to navigate to update 
    const handleNavigateUpdate = (id: number) => {
        history(`/blog/update/${id}`);
    };

    // function to navigate to add 
    const handleNavigation = () => {
        history("/blog/add");
    };

    // function to handle search change
    const handleSearchChange = (event: any) => {
        setFilter({ ...filter, search: event.target.value });
    };

    // function to handle delete of 
    const handleToggleDelete = (id?: number | boolean) => {
        setSelectedId([]);
        setIndex((typeof id === 'number') ? [id] : undefined);
        setDeleteOpen((prevState) => !prevState);
        if (id === true) {
            fetchData();
        }
    };
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card className='module_wrap'>
                                <MDBox
                                    className='module_head'
                                    mx={2}
                                    mt={-3}
                                    py={2}
                                    px={2}
                                    variant="gradient"
                                    bgColor={sidenavColor}
                                    borderRadius="lg"
                                    coloredShadow="info"
                                >
                                    <MDTypography
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        variant="h6"
                                        color="white"
                                    >
                                        {globalMessages.Blog.table}
                                        <Grid className='action_wrap d_flex'>
                                            {

                                                <MDButton className='action-button' variant={'contained'} onClick={handleNavigation} children={<Add />} />
                                            }

                                        </Grid>
                                    </MDTypography>
                                </MDBox>
                                <MDBox
                                    className='export_btn'
                                    mx={2}
                                    mt={3}
                                    display="flex"
                                    justifyContent="space-around"
                                    alignItems="center"
                                >
                                    <MDBox
                                        className='item_left'
                                        fontSize="medium"
                                        flex="8"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <MDInput
                                            className='form-control'
                                            sx={{ mr: 1 }}
                                            value={filter.search}
                                            onChange={handleSearchChange}
                                            label={
                                                globalMessages.Blog.search
                                            }
                                        />

                                    </MDBox>
                                </MDBox>
                                <MDBox pt={3} className='table_custom'>
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={true}
                                        entriesPerPage={true}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                </MDBox>
                            </Card>
                            <MDBox
                                className='action_wrap mt-30'
                            >
                                {
                                    <MDButton disabled={selectedId.length === 0} onClick={() => setDeleteOpen(true)} color="error"> Delete</MDButton>
                                }
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                <Footer />
            </DashboardLayout>
            <Confirm message={globalMessages.Blog.delete_confirm} method={service.Methods.DELETE} url={service.API_URL.Blog.delete} visible={deleteOpen} closeModal={handleToggleDelete} id={selectedId.length > 0 ? selectedId : index} />
        </>
    );
};

export default BlogList;
