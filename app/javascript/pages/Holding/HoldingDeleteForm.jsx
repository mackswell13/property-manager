import { useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function HoldingDeleteForm({ holdingId, className }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Are you sure you want to delete this holding?")) {
            destroy(`/holdings/${holdingId}`);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={processing}
            className={className}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
}

