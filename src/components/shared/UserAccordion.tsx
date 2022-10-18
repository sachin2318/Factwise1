import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Avatar,
  SimpleGrid,
  Textarea,
  Editable,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import {
  MinusIcon,
  AddIcon,
  DeleteIcon,
  EditIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { css, StyleSheet } from "aphrodite";
import { MOBILE_QUERY } from "../constants/mediaQuery";
import { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/system";
import * as Yup from "yup";
import getAge from "../utils/getAge";

interface UserAccordionProps {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
  setAllowToggle: Function;
  editableId: string;
  setEditableId: Function;
  setUpdateData: Function;
}

const UserAccordion: React.FC<UserAccordionProps> = ({
  id,
  country,
  description,
  dob,
  email,
  first,
  gender,
  last,
  picture,
  editableId,
  setEditableId,
  setAllowToggle,
  setUpdateData,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [disable, setDisbale] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialValues, setInitialValues] = useState({
    first,
    last,
    picture,
    email,
    id: id,
    gender: gender,
    country: country,
    description: description,
    dob: dob,
  });
  const schema = Yup.object({
    first: Yup.string().required("Required"),
    last: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (isEdit) {
      setAllowToggle(false);
      setEditableId(id.toLocaleString());
    } else {
      setAllowToggle(true);
      setEditableId("");
    }
  }, [isEdit]);

  const resetandUpdate = (ary) => {
    localStorage.setItem("fakeUserData", JSON.stringify(ary));
    setAllowToggle(true);
    setEditableId("");
    setIsEdit(false);
    setUpdateData(true);
  };
  const handleEdit = (values) => {
    let data = localStorage.getItem("fakeUserData");
    let ary = JSON.parse(data as any);
    let modifyAry = ary.map((e) => {
      if (e.id == values.id) {
        e = values;
        return e;
      } else {
        return e;
      }
    });
    resetandUpdate(modifyAry);
  };
  const handleDelete = (e) => {
    let data = localStorage.getItem("fakeUserData");
    let ary = JSON.parse(data as any);
    let modifyAry = ary.filter((e) => {
      if (e.id !== id) {
        return e;
      }
    });
    resetandUpdate(modifyAry);
  };
  return (
    <>
      <AccordionItem
        className={css(styles.accordianItem)}
        isDisabled={
          editableId.length ? editableId !== id.toLocaleString() : false
        }
      >
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Flex flex={"1"} alignItems={"center"}>
                  <Box mr={"18px"}>
                    <Avatar
                      name={first.concat(last)}
                      size="sm"
                      src={picture}
                    ></Avatar>
                  </Box>
                  {/* {isEdit ? (
                    <chakra.input
                      className={css(styles.nameBar) + " header-search-bar"}
                      value={name}
                      onChange={handleNameChange}
                    ></chakra.input>
                  ) : ( */}
                  <Box>
                    {first} {last}
                  </Box>
                  {/* )} */}
                </Flex>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {isEdit ? (
                <>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={handleEdit}
                  >
                    {({ handleSubmit, errors, touched, ...formik }) => {
                      if (
                        JSON.stringify(formik.initialValues) !==
                        JSON.stringify(formik.values)
                      ) {
                        setDisbale(false);
                      } else {
                        setDisbale(true);
                      }
                      return (
                        <Form>
                          <SimpleGrid
                            columns={3}
                            spacingX={["15px", "24px"]}
                            mb={"10px"}
                          >
                            <FormControl
                              isInvalid={!!errors.dob && touched.dob}
                            >
                              <FormLabel
                                color="#606f80"
                                fontSize={"13px"}
                                fontWeight="400"
                                htmlFor="dob"
                              >
                                Age
                              </FormLabel>
                              <Field
                                as={Input}
                                id="dob"
                                name="dob"
                                type="date"
                                variant="filled"
                              />
                              <FormErrorMessage>{errors.dob}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                              isInvalid={!!errors.gender && touched.gender}
                            >
                              <FormLabel
                                color="#606f80"
                                fontSize={"13px"}
                                fontWeight="400"
                                htmlFor="gender"
                              >
                                Gender
                              </FormLabel>
                              <Field
                                as={Select}
                                id="gender"
                                name="gender"
                                type="text"
                                variant="filled"
                              >
                                {/* <Select
                                id="gender"
                                variant="filled"
                                name="gender"
                              > */}
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Transgender"}>
                                  Transgender
                                </option>
                                <option value={"Rather not say"}>
                                  Rather not say
                                </option>
                                <option value={"Other"}>Other</option>
                              </Field>
                              <FormErrorMessage>
                                {errors.gender}
                              </FormErrorMessage>
                            </FormControl>
                            <FormControl
                              isInvalid={!!errors.country && touched.country}
                            >
                              <FormLabel
                                color="#606f80"
                                fontSize={"13px"}
                                fontWeight="400"
                                htmlFor="country"
                              >
                                Country
                              </FormLabel>
                              <Field
                                as={Input}
                                id="country"
                                name="country"
                                type="text"
                                variant="filled"
                              />
                              <FormErrorMessage>
                                {errors.country}
                              </FormErrorMessage>
                            </FormControl>
                          </SimpleGrid>
                          <FormControl
                            isInvalid={
                              !!errors.description && touched.description
                            }
                          >
                            <FormLabel
                              color="#606f80"
                              fontSize={"13px"}
                              fontWeight="400"
                              htmlFor="description"
                            >
                              Description
                            </FormLabel>
                            <Field
                              as={Textarea}
                              className={css(styles.textarea)}
                              id="description"
                              name="description"
                              type="text"
                              variant="filled"
                            />
                            <FormErrorMessage>
                              {errors.description}
                            </FormErrorMessage>
                          </FormControl>
                          <Box float={"right"} mt="10px" mb="10px">
                            {isEdit ? (
                              <>
                                <CloseIcon
                                  fontSize="14px"
                                  color="#eb1e1a"
                                  mr="14px"
                                  cursor={"pointer"}
                                  onClick={() => {
                                    setIsEdit((prev) => !prev);
                                  }}
                                />
                                <CheckIcon
                                  fontSize="20px"
                                  color={!disable ? "#319795" : ""}
                                  cursor={!disable ? "pointer" : "not-allowed"}
                                  onClick={() => {
                                    if (!disable) {
                                      handleEdit(formik.values);
                                    }
                                  }}
                                />
                              </>
                            ) : null}
                          </Box>
                        </Form>
                      );
                    }}
                  </Formik>
                </>
              ) : (
                <Box>
                  <SimpleGrid
                    columns={3}
                    spacingX={["15px", "24px"]}
                    mb={"10px"}
                  >
                    <Box>
                      <FormLabel
                        color="#606f80"
                        fontSize={"13px"}
                        fontWeight="400"
                        htmlFor="dob"
                      >
                        Age
                      </FormLabel>
                      <chakra.p>{`${getAge(
                        initialValues.dob
                      )} Years`}</chakra.p>
                    </Box>
                    <Box>
                      <FormLabel
                        color="#606f80"
                        fontSize={"13px"}
                        fontWeight="400"
                        htmlFor="dob"
                      >
                        Gender
                      </FormLabel>
                      <chakra.p>{initialValues.gender}</chakra.p>
                    </Box>
                    <Box>
                      <FormLabel
                        color="#606f80"
                        fontSize={"13px"}
                        fontWeight="400"
                        htmlFor="dob"
                      >
                        Country
                      </FormLabel>
                      <chakra.p>{initialValues.country}</chakra.p>
                    </Box>
                  </SimpleGrid>
                  <Box>
                    <FormLabel
                      color="#606f80"
                      fontSize={"13px"}
                      fontWeight="400"
                      htmlFor="dob"
                    >
                      Description
                    </FormLabel>
                    <chakra.p>{initialValues.description}</chakra.p>
                  </Box>
                </Box>
              )}
              <Box float={"right"} mt="10px" mb="10px">
                {!isEdit ? (
                  <>
                    <DeleteIcon
                      fontSize="16px"
                      color="#eb1e1a"
                      mr="10px"
                      cursor={"pointer"}
                      onClick={onOpen}
                    />
                    <EditIcon
                      fontSize="16px"
                      color={getAge(initialValues.dob) > 18 ? "#319795" : ""}
                      cursor={
                        getAge(initialValues.dob) > 18
                          ? "pointer"
                          : "not-allowed"
                      }
                      onClick={() => {
                        if (getAge(initialValues.dob) > 18)
                          setIsEdit((prev) => !prev);
                      }}
                    />
                  </>
                ) : null}
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure want to delete?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg="red.500"
              fontSize="lg"
              fontWeight="bold"
              colorScheme="red"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  accordianItem: {
    maxWidth: "450px",
    width: "100%",
    border: "1px solid",
    borderRadius: "20px",
    marginBottom: "10px",
    [MOBILE_QUERY]: {},
  },
  textarea: {
    height: "150px",
    [MOBILE_QUERY]: {
      height: "80px",
    },
  },
  nameBar: {
    display: "inline-block",
    fontSize: "14px",
    height: "40px",
    lineHeight: "24px",
    width: "75%",
    padding: "8px 10px 10px",
    border: "1px solid #f5f5f6",
    borderRadius: "6px",
    backgroundColor: "#f5f5f6",
    ":focus": {
      backgroundColor: "#fff",
      borderColor: "#eaeaec",
    },
  },
});
export default UserAccordion;
