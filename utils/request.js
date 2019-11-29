function Request (option) {
  return wx.request({
    url: '',
    data: option.data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: option.method,
    dataType: 'json',
    responseType: 'text',
    success: option.success,
    fail: option.error,
    complete: option.complete
  })
}
