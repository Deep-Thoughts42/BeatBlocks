export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div className="alert alert-error mt-2">
        <div>
          <label className="text-center">There has been an error in processing the payment. Please try again.</label>
        </div>
      </div>
    );
  }