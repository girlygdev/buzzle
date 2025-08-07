/**
 * Standard JSON response
 *
 * @param {Object} options
 * @param {String} options.message
 * @param {Object|Array|null} [options.data=null]
 * @param {Boolean} [options.success=true] 
 * @param {Object} [options.meta] 
 * @param {Object} [options.error]
 */
const jsonResponseHelper = ({
  message,
  data = null,
  flag = "success" ,
  meta,
  error,
}) => {
  const response = { flag, message };
  
  if (data) response.data = data
  if (meta) response.meta = meta;
  if (error) response.error = error;

  return response;
};

module.exports = {
	jsonResponseHelper
};
