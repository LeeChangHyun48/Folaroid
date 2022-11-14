import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import styled from '@emotion/styled';
import {
    getHash,
    createStack,
    deleteStack,
    getStack,
} from '../../modules/intro/stack';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    background-color: rgba(140, 140, 140, 0.35);
    padding: 15px;
    font-size: 1.5rem;
    font-weight: bolder;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DeleteBtn = styled.button`
    border-radius: 50%;
    background-color: red;
    width: 18px;
    height: 18px;
    border: red;
`;

const IntroCardContent = styled(CardContent)`
    background-color: ghostwhite;
`;

const IntroBox = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function StackInput(props) {
    const hash = useSelector((state) => state.stack.hash);
    console.log(hash);
    const [stackData, setStackData] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHash());
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onCreate(stackData);
        setStackData('');
    };

    return (
        <IntroBox>
            <CardHeader>기술스택</CardHeader>
            <Card>
                <IntroCardContent>
                    <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
                        <Autocomplete
                            style={{ width: '50%', borderInlineColor: 'white' }}
                            options={hash}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="stack"
                                    variant="filled"
                                    value={stackData}
                                    onChange={(newValue) => {
                                        setStackData(newValue);
                                    }}
                                />
                            )}
                        />
                    </form>
                </IntroCardContent>
            </Card>
        </IntroBox>
    );
}

function ReadStack(props) {
    const dispatch = useDispatch();

    const handleDelete = (introStackNo) => () => {
        console.info('You clicked');
        dispatch(deleteStack(introStackNo));
        // setStack((stacks) =>
        //     stacks.filter((stack) => stack.stackNo !== stackToDelete.stackNo)
        // );
    };

    const rowItems = props.stack.map((data) => (
        <Stack spacing={2} alignItems="center">
            <ListItem key={data.hashNo}>
                <Chip
                    style={{ margin: '5px' }}
                    label={data.hashName}
                    onDelete={handleDelete(data)}
                    color="primary"
                    variant="outlined"
                ></Chip>
            </ListItem>
        </Stack>
    ));

    return (
        <IntroCardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '80%',
                    border: 'solid 1px gray',
                    borderRadius: '30px',
                }}
                component="ul"
            >
                {rowItems}
            </Box>
        </IntroCardContent>
    );
}

function ViewName() {
    const hash = useSelector((state) => state.stack.hash);
    const stack = useSelector((state) => state.stack.stack);
    const { pathname } = useLocation();
    const store = useStore();
    const intro_no =
        pathname === '/intro'
            ? store.getState().auth.user.intro_no
            : store.getState().portfolio.pf.introNo;
    const [mode, setMode] = useState('CREATE');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('스쿨', intro_no);
        dispatch(getStack(intro_no));
    }, [dispatch, intro_no]);

    if (stack.length !== 0 && mode === 'CREATE') {
        setMode('READ');
    } else if (Array.isArray(stack) && stack.length === 0 && mode === 'READ') {
        setMode('CREATE');
    }

    let content = null;
    if (mode === 'CREATE') {
        content = (
            <StackInput
                onCreate={(_hash) => {
                    dispatch(
                        createStack({
                            introNo: intro_no,
                            hashNo: _hash,
                        })
                    );
                    setMode('READ');
                }}
            ></StackInput>
        );
    } else if (mode === 'READ') {
        console.log({ stack });
        content = (
            <IntroBox>
                <CardHeader>학력</CardHeader>
                <Card>
                    <StackInput
                        onCreate={(_hash) => {
                            dispatch(
                                createStack({
                                    introNo: intro_no,
                                    hashNo: _hash,
                                })
                            );
                            setMode('READ');
                        }}
                    ></StackInput>
                    <ReadStack stack={stack}></ReadStack>
                </Card>
            </IntroBox>
        );
    }

    return content;
}

export default ViewName;

// const StackInputModule = () => {
//     const [stackData, setStackData] = useState([
//         { key: 0, label: 'Angular' },
//         { key: 1, label: 'jQuery' },
//         { key: 2, label: 'Polymer' },
//         { key: 3, label: 'React' },
//         { key: 4, label: 'Vue.js' },
//         { key: 5, label: 'Angular' },
//         { key: 6, label: 'jQuery' },
//         { key: 7, label: 'Polymer' },
//         { key: 8, label: 'React' },
//         { key: 9, label: 'Vue.js' },
//     ]);

//     // const [stack, setStack] = useState['']

//     const handleDelete = (stackToDelete) => () => {
//         console.info('You clicked');
//         setStackData((stacks) =>
//             stacks.filter((stack) => stack.key !== stackToDelete.key)
//         );
//     };

//     // const handleChangeStack = useCallback((event) => {
//     //   setStack(event.target.value);
//     // }, []);

//     const handleSubmit = (event) => {
//         alert(`이름: ${stackData}`);
//         event.preventDefault();
//     };

//     return (
//         <IntroBox>
//             <CardHeader>기술스택</CardHeader>
//             <Card>
//                 {/* <CardHeader suppressHydrationWarning title="기술스택" /> */}
//                 <div
//                     style={{
//                         display: 'flex',
//                         width: '100%',
//                         justifyContent: 'center',
//                     }}
//                 >
//                     <Autocomplete
//                         multiple
//                         style={{ width: '50%', borderInlineColor: 'white' }}
//                         options={stackData}
//                         getOptionLabel={(option) => option.label}
//                         filterSelectedOptions
//                         renderInput={(params) => (
//                             <TextField
//                                 variant="filled"
//                                 {...params}
//                                 placeholder="stacks"
//                             />
//                         )}
//                     />
//                 </div>

//                 <IntroCardContent>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignContent: 'center',
//                             flexWrap: 'wrap',
//                             listStyle: 'none',
//                             p: 0.5,
//                             marginRight: 'auto',
//                             marginLeft: 'auto',
//                             width: '80%',
//                             border: 'solid 1px gray',
//                             borderRadius: '30px',
//                         }}
//                         component="ul"
//                     >
//                         {stackData.map((data) => {
//                             return (
//                                 <Stack spacing={2} alignItems="center">
//                                     <ListItem key={data.key}>
//                                         <Chip
//                                             style={{ margin: '5px' }}
//                                             label={data.label}
//                                             onDelete={handleDelete(data)}
//                                             color="primary"
//                                             variant="outlined"
//                                         ></Chip>
//                                     </ListItem>
//                                 </Stack>
//                             );
//                         })}
//                     </Box>
//                 </IntroCardContent>
//             </Card>
//         </IntroBox>
//     );
// };

// export default StackInput;
