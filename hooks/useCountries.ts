import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CountriesData, CountryData } from '../types';

export const useCountries = () => {
    const [data, setData] = useState<CountriesData>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("hereer--------")
        const fetchCountries = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'countries'));
                const countries: CountriesData = {};
                querySnapshot.forEach((doc) => {
                    countries[doc.id] = doc.data() as CountryData;
                });
                console.log(countries)
                setData(countries);
            } catch (err: any) {
                console.error("Error fetching countries:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { data, loading, error };
};
