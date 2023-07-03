import { validateKhaltiPayment } from "@/payment-gateways/khalti"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function PaymentStatus() {
    useEffect(() => {
        validateKhaltiPayment(router.query.pidx)
    })
    const router = useRouter();
    return <></>
}