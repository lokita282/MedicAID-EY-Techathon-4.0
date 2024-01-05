import { React, useState, useEffect } from 'react'
import {
  getSingleAppointmentDetails,
  getDifferentialDiagnoses,
} from '../../services/doctorService.js'
import Loading from '../loader/Loading'
import { df_jc_ac } from '../../theme/CssMy'
import { Box, Stack , Chip} from '@mui/material'




const ViewDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState([])
  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    setLoading(true)
    const id = window.location.href.split('/')[4]
    const func = async () => {
      console.log('here')
      await getSingleAppointmentDetails(id).then((res) => {
        var x = {
          demographics: [
            res.data.appointment.patientId.patientDemographics.age.toString(),
            res.data.appointment.patientId.patientDemographics.gender,
            res.data.appointment.patientId.patientDemographics.height,
            res.data.appointment.patientId.patientDemographics.weight,
          ],
          symptoms: res.data.appointment.symptoms,
        }
        getDifferentialDiagnoses(x).then((res) => {
          console.log(res)
          setDiagnoses(res.data)
          setLoading(false)
        })
      })
    }
    func()
  }, [])

  return (
    <>
      {loading ? (
        <Box sx={{ ...df_jc_ac, height: '40vh' }}>
          <Loading />
        </Box>
      ) : (
        diagnoses?.map((disease) => (
          <Box
            key={disease}
            direction="column"
            sx={{ boxShadow: 1, borderRadius: 4, mt: 2 }}
          >
            <Box
              sx={{
                backgroundColor: '#EAEAEA',
                px: 2,
                py: 1,
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                fontWeight: 'bold',
              }}
            >
              {disease.name}
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
              }}
            >
              {disease.description}
            </Box>
            <Stack direction="row" spacing={2} sx={{ px: 1, py: 1 }}>
              <Chip label={`${disease.probability}`} />
              {disease.probability > '65%' ? (
                <Chip
                  label="Most Probable"
                  sx={{
                    color: 'rgb(74,177,102)',
                    backgroundColor: 'rgba(74,177,102,0.2)',
                  }}
                />
              ) : (
                ''
              )}

              <Chip
                label={`${
                  disease.next_tests ||
                  disease.tests ||
                  disease.next_medical_tests
                }`}
              />
            </Stack>
          </Box>
        ))
      )}
    </>
  )
}

// eslint-disable-next-line no-lone-blocks
{
  /* {tabSwitch === 'files' ? (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3,
                      }}
                    >
                      <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                        Uploaded Files:
                      </Box>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgb(0,87,57)',
                          color: 'rgb(0,87,57)',
                          boxShadow: 'none',
                        }}
                        onClick={(e) => setTabSwitch('diagnoses')}
                      >
                        <Box sx={{ fontWeight: 20 }}> View Diagnoses </Box>
                      </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {reports?.map((image) => (
                        <img
                          src={`data:image/jpeg;base64,${image.reports}`}
                          height="50%"
                          width="50%"
                          alt="report"
                        />
                      ))}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3,
                      }}
                    >
                      <Box sx={{ fontSize: 20, fontWeight: 600 }}>
                        Possible Differential Diagnoses:
                      </Box>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgb(0,87,57)',
                          color: 'rgb(0,87,57)',
                          boxShadow: 'none',
                        }}
                        onClick={(e) => setTabSwitch('files')}
                      >
                        <Box sx={{ fontWeight: 20 }}> View Files </Box>
                      </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {tabSwitch === 'diagnoses' ? (
                        diagnoses.map((disease) => (
                          <Box
                            key={disease}
                            direction="column"
                            sx={{ boxShadow: 1, borderRadius: 4, mt: 2 }}
                          >
                            <Box
                              sx={{
                                backgroundColor: '#EAEAEA',
                                px: 2,
                                py: 1,
                                borderTopLeftRadius: 14,
                                borderTopRightRadius: 14,
                                fontWeight: 'bold',
                              }}
                            >
                              {disease.name}
                            </Box>
                            <Box
                              sx={{
                                px: 2,
                                py: 1,
                                borderBottomLeftRadius: 14,
                                borderBottomRightRadius: 14,
                              }}
                            >
                              {disease.description}
                            </Box>
                            <Stack
                              direction="row"
                              spacing={2}
                              sx={{ px: 1, py: 1 }}
                            >
                              <Chip label={`${disease.probability}`} />
                              {disease.probability > '70%' ? (
                                <Chip
                                  label="Most Probable"
                                  sx={{
                                    color: 'rgb(74,177,102)',
                                    backgroundColor: 'rgba(74,177,102,0.2)',
                                  }}
                                />
                              ) : (
                                ''
                              )}

                              <Chip
                                label={`${
                                  disease.next_tests ||
                                  disease.tests ||
                                  disease.next_medical_tests
                                }`}
                              />
                            </Stack>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ mt: 2 }}>
                          {reports?.map((image) => (
                            <img
                              src={`data:image/jpeg;base64,${image.reports}`}
                              height="50%"
                              width="50%"
                              alt="report"
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </>
                )} */
}

export default ViewDiagnoses
