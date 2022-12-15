// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  form: {
    title: 'Profile',
    avatar: 'Add avatar',
    age: 'Age',
    income: 'Annual income',
    gender: 'Sex',
    investmentHistory: 'Investment history',
    accountType: 'Account type',
    description: 'Profile',
    submit: 'Next',
    placeholders: {
      username: 'User name',
      select: 'Please select',
      male: 'Male',
      female: 'Female',
      undisclosed: 'Undisclosed',
    },
  },
  accountConnect: {
    title: 'Securities Account Connect',
  },
  accountProcess: {
    error: {
      errorCode: {
        INPUT_INVALID: 'Input Invalid',
      },
    },
    title: 'Accounting Process',
    table: {
      id: 'Credit Reverse ID',
      branchCode: 'Branch Code',
      accountCode: 'Account Code',
      brandCode: 'Brand Code',
      orderDate: 'Order Date',
      orderAmount: 'Order Amount',
      accountType: 'Account Type',
      invalidCardResult: 'Invalid Card Result',
      branchLockResult: 'Branch Lock Result',
      yCustomerResult: 'Y Customer Result',
      moneyShortage: 'Money Shortage Result',
      nisaResult: 'Nisa Result',
      nameMatching: 'Name Matching Result',
      authSale: 'Auth Sale Result',
      snrFundsId: 'SNR Funds Id',
      snrDepositId: 'SNR Deposit Id',
      action: 'Action',
      reject: 'Reject',
      retry: 'All Retry',
    },
    checkNisa: 'Check Nisa Waku',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
  },
  result: {
    title: 'Result',
    noData: 'No Data Found',
    error: {
      errorCode: {
        INPUT_INVALID: 'Input Invalid',
      },
    },
  },
  orderList: {
    title: 'Order List',
    headers: {
      ID: 'ID',
      ['month/Year']: 'Month/Year',
      orderDate: 'Order date',
      status: 'Status',
      action: 'Action',
    },
    thisMonthOrder: "This month's order list",
    lastMonthOrder: "Previous month's order list ",
  },
  changePasswordIcon: 'Change Password',
  logout: 'Logout',
  logoutSuccess: 'Logout Success',
  notFound: '404 The page you are looking for could not be found',
  notLogin: 'You Seem Not Logged In, Return To The Login Page',
  titleNotLogin: 'Return To Login Page',
  cannotLoadList: "Can't load list",
  login: {
    title: 'Login',
    inputID: 'Email address',
    inputPw: 'Password',
    remember: 'Remember me',
    loading: 'Loading...',
    message: {
      success: 'Login Success',
    },
    invalidEmail: 'Invalid Email',
    notEmpty: 'Must be not empty!',
    error: {
      errorCode: {
        401: 'Wrong password',
        EMAIL_NOT_FOUND: 'Email Not Found',
        INVALID_ACCOUNT: 'Invalid account',
        WRONG_PASSWORD: 'Wrong Password',
        INPUT_INVALID: 'Input Invalid',
        INTERNAL_SERVER_ERROR: 'Internal server error',
      },
    },
  },
  changePassword: {
    title: 'Change Password',
    oldPw: 'Old Password',
    newPw: 'New Password',
    reNewPw: 'Re-enter new password',
    changeBtn: 'Change Password',
    notMatch: 'Password not match',
    notEnoughCondition:
      'Password must contain Uppercase Letter, Lowercase Letter, Number, Special characters and at least 8 - 16 characters',
    doNotMatch: 'The New Password Cannot Be The Same As The Old Password',
    error: {
      errorCode: {
        WRONG_PASSWORD: 'Wrong Password',
      },
    },
    success: 'Password changed successfully. Please login again!',
  },
};
