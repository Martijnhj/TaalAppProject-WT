package com.martijn.taalapp.controller;

import com.martijn.taalapp.domein.Vertaling;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface VertalingRepository extends CrudRepository<Vertaling, Long> {
    //1 via erfrelatie
    //2 via methodenamen naamanalyse met reserved words in functions icm met fieldnamen
    //3 @Query -> SQL taal typen (dialect namelijk JPQL) kan ook voor zorgen dat je normale SQL kan typen. Dan moet je nativeQuery = true als tweede argument.

    //Iterable<Vertaling> findByTargetLanguageContaining(String input);


}
