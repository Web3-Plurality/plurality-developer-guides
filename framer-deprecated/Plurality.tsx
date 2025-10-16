import React, { useEffect, useState } from "react"

export default function Plurality(props) {
    const [PluralitySocialConnect, setPluralitySocialConnect] = useState(null)

    useEffect(() => {
        // ✅ Check if it's already available in window (not from state)
        if (window.PluralitySocialConnect) {
            console.log("PluralitySocialConnect found on window!")
            setPluralitySocialConnect(() => window.PluralitySocialConnect) // ✅ Use the global reference
            return
        }

        const script = document.createElement("script")
        script.src =
            "https://unpkg.com/@plurality-network/smart-profile-wallet@latest/dist/index.umd.js"
        script.async = true

        script.onload = () => {
            setTimeout(() => {
                console.log(
                    "Checking window.PluralitySocialConnect:",
                    window.PluralitySocialConnect
                )
                if (window.PluralitySocialConnect) {
                    setPluralitySocialConnect(
                        () => window.PluralitySocialConnect
                    ) // ✅ Correctly setting from window
                } else {
                    console.error(
                        "PluralitySocialConnect still not found on window."
                    )
                    console.log("Available globals:", Object.keys(window)) // Debugging
                }
            }, 100) // Small delay in case script needs time
        }

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    if (!PluralitySocialConnect) {
        return <div>Loading...</div>
    }

    const options = {
        clientId: "9a4e2a19-42e6-4b75-8710-1246439eb1db",
        theme: "light",
        text: "Login",
    }

    const handleDataReturned = (data) => {
        console.log("Login info callback data (Inside dApp)::", data)
    }

    return (
        <div>
            <PluralitySocialConnect
                options={options}
                onDataReturned={handleDataReturned}
            />
        </div>
    )
}
