export default function Toaster(message) {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    preventDuplicates: true,
    onclick: null,
    position: "left, top",
    showDuration: "100",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "show",
    hideMethod: "hide",
  };
  toastr.success(message);
}
