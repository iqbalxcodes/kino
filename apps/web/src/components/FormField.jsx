function FormField({ label, htmlFor, error, hint, children }) {
    return (
        <div className="form-field">
            <label htmlFor={htmlFor}>{label}</label>
            {children}
            {error
                ? <small className="field-error" role="alert">{error}</small>
                : hint && <small className="field-hint">{hint}</small>}
        </div>
    );
}

export default FormField;
