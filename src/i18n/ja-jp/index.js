// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  form: {
    title: 'みよっと会員登録',
    avatar: '画像・ユーザー',
    age: '年齢❅',
    income: '年収',
    gender: '性別',
    investmentHistory: '投資歴',
    accountType: 'あなたのタイプ',
    description: 'プロフィール',
    submit: '次へ',
    placeholders: {
      username: 'ユーザー名',
      select: '選択してください',
      male: '男性',
      female: '女',
      undisclosed: '未回答',
    },
  },
  accountConnect: {
    title: 'Securities Account Connect',
  },
  accountProcess: {
    error: {
      errorCode: {
        INPUT_INVALID: '入力無効',
      },
    },
    title: '会計処理',
    table: {
      id: 'クレジットリバースID',
      branchCode: '支店コード',
      accountCode: 'アカウントコード',
      brandCode: 'ブランドコード',
      orderDate: '注文日',
      orderAmount: '注文金額',
      accountType: 'アカウントの種類',
      invalidCardResult: '無効なカードの結果',
      branchLockResult: 'ブランチ ロックの結果',
      yCustomerResult: 'Y 顧客結果',
      moneyShortage: '資金不足の結果',
      nisaResult: 'Nisa結果',
      nameMatching: '名前マッチング結果',
      authSale: '認証販売結果',
      snrFundsId: 'SNR 資金 ID',
      snrDepositId: 'SNR デポジット ID',
      action: 'アクション',
      reject: '拒絶',
      retry: 'すべて再試行',
    },
    checkNisa: 'にさわくをチェック',
    next: '次',
    previous: '前',
    finish: '終了',
  },
  result: {
    title: '結果',
    noData: 'データが見つかりません',
    error: {
      errorCode: {
        INPUT_INVALID: '入力が無効です',
      },
    },
  },
  orderList: {
    title: '注文リスト',
    headers: {
      ID: 'ID',
      ['month/Year']: '月/年',
      orderDate: '発注日',
      status: 'ステータス',
      action: '作業',
    },
    thisMonthOrder: '今月の投資発注リスト',
    lastMonthOrder: '前月の投資発注リスト',
  },
  changePasswordIcon: 'パスワードの変更',
  logout: 'ログアウト',
  logoutSuccess: 'ログアウト成功',
  notFound: '404お探しのページが見つかりませんでした',
  notLogin: 'ログインしていないようです。ログイン ページに戻ります',
  titleNotLogin: 'ログインページに戻る',
  cannotLoadList: 'リストを読み込めません',
  login: {
    title: 'ログインする',
    inputID: 'メールアドレス',
    inputPw: 'パスワード',
    remember: '私を覚え',
    loading: '読み込んでいます...',
    message: {
      success: 'ログイン成功',
    },
    invalidEmail: '無効な電子メール',
    notEmpty: '空であってはなりません!',
    error: {
      errorCode: {
        401: '間違ったパスワード',
        EMAIL_NOT_FOUND: 'メールが見つかりません',
        INVALID_ACCOUNT: '無効なアカウント',
        WRONG_PASSWORD: '間違ったパスワード',
        INPUT_INVALID: '入力無効',
        INTERNAL_SERVER_ERROR: '内部サーバーエラー',
      },
    },
  },
  changePassword: {
    title: 'パスワード変更',
    oldPw: '古いパスワード',
    newPw: '新しいパスワード',
    reNewPw: '新規パスワードを再入力',
    changeBtn: 'パスワードの変更',
    notMatch: 'パスワードが一致しません',
    notEnoughCondition:
      'パスワードには、大文字、小文字、数字、特殊文字、および少なくとも 8 ～ 16 文字を含める必要があります',
    doNotMatch: '新しいパスワードを古いパスワードと同じにすることはできません',
    error: {
      errorCode: {
        WRONG_PASSWORD: '間違ったパスワード',
      },
    },
    success: 'パスワードの変更に成功しました。もう一度ログインしてください!',
  },
};
