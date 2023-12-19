import httpcommon from '../httpcommon'

export const validateUtility = (data) => {
  return httpcommon.post(`/beneficiary/utility/validate-voucher`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
    },
  })
}

export const redeemUtility = (data) => {
  return httpcommon.post(`/beneficiary/utility/redeem-voucher`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
    },
  })
}
