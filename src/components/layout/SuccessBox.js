export default function SuccessBox({children}) {
    return (
        <div className="text-center bg-green-200 rounded-lg text-base my-3">
            {children}
        </div>
    );
  }