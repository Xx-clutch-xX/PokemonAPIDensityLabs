import { useAppSelector } from "../../../app/hooks"

function GeneralDataContainer(){
    const {pokemonData} = useAppSelector((state)=>state.ListSliceReducer)

    function percentageStats(stat:number){
        let percentage = (100*stat) / 255
        return percentage
    }

    return(
        <div className={`general-data-container`}>
            <div className="abilities-container">
                <h3>Abilities</h3>
                <hr></hr>
                {pokemonData ? pokemonData.abilities.map((ability:any, _id)=>{
                    return(
                        <p key={_id}>{ability.ability.name}</p>
                    )
                }):'...loading'}
            </div>
            <div> 
                <h3>Base Stats</h3>
                <hr />
                {pokemonData ? pokemonData.stats.map((stat:any, _id:number)=>{
                    return(
                        <div key={_id}>
                            <p>{stat.stat.name}: {stat.base_stat}</p>
                            <div className="status-bar">
                                <div style={{width:`${percentageStats(stat.base_stat)}%`}}></div>
                            </div>
                        </div>
                    )
                }):'...loading'}
            </div>
        </div>
    )
}

export default GeneralDataContainer